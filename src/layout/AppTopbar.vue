<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useLayout } from './composables/layout'

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout()

interface MessageItem {
  id: number
  sender: string
  subject: string
  time: string
  read: boolean
}

const isMessagesOpen = ref(false)
const messagePopoverRef = ref<HTMLElement | null>(null)
const mobileMessageButtonRef = ref<HTMLElement | null>(null)
const desktopMessageButtonRef = ref<HTMLElement | null>(null)
const topbarActionsRef = ref<HTMLElement | null>(null)
const popoverAnchor = ref<'desktop' | 'mobile'>('desktop')
const popoverStyles = ref<Record<string, string>>({})

const messages = ref<MessageItem[]>([
  {
    id: 1,
    sender: 'Customer Support',
    subject: 'Kartu Anda berhasil diaktifkan',
    time: '2m ago',
    read: false,
  },
  {
    id: 2,
    sender: 'Maila Alvianti',
    subject: 'Perubahan jadwal meeting',
    time: '1h ago',
    read: false,
  },
  {
    id: 3,
    sender: 'Billing',
    subject: 'Tagihan bulanan tersedia',
    time: 'Yesterday',
    read: true,
  },
])

const unreadCount = computed(() => messages.value.filter((message) => !message.read).length)

const positionPopover = () => {
  const popoverEl = messagePopoverRef.value
  const actionsEl = topbarActionsRef.value
  const anchorEl =
    popoverAnchor.value === 'desktop'
      ? desktopMessageButtonRef.value
      : mobileMessageButtonRef.value

  if (!popoverEl || !actionsEl) {
    return
  }

  if (popoverAnchor.value === 'desktop' && anchorEl) {
    const anchorRect = anchorEl.getBoundingClientRect()
    if (anchorRect.width === 0 && anchorRect.height === 0) {
      popoverStyles.value = {
        right: '0',
        top: 'calc(100% + 0.75rem)',
        left: 'auto',
      }
      return
    }
    const containerRect = actionsEl.getBoundingClientRect()
    const popoverRect = popoverEl.getBoundingClientRect()
    const gap = 12
    const rawLeft =
      anchorRect.left +
      anchorRect.width / 2 -
      containerRect.left -
      popoverRect.width / 2
    const maxLeft = Math.max(containerRect.width - popoverRect.width, 0)
    const left = Math.min(Math.max(rawLeft, 0), maxLeft)
    const top = anchorRect.bottom - containerRect.top + gap
    popoverStyles.value = {
      left: `${left}px`,
      top: `${top}px`,
      right: 'auto',
    }
  } else {
    popoverStyles.value = {
      right: '0',
      top: 'calc(100% + 0.75rem)',
      left: 'auto',
    }
  }
}

const toggleMessages = (anchor: 'desktop' | 'mobile') => {
  if (isMessagesOpen.value && popoverAnchor.value === anchor) {
    isMessagesOpen.value = false
    return
  }

  popoverAnchor.value = anchor
  isMessagesOpen.value = true
  nextTick(() => positionPopover())
}

const closeMessages = () => {
  isMessagesOpen.value = false
}

const markAsRead = (message: MessageItem) => {
  if (!message.read) {
    message.read = true
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  const clickedPopover = messagePopoverRef.value?.contains(target) ?? false
  const clickedMobileButton = mobileMessageButtonRef.value?.contains(target) ?? false
  const clickedDesktopButton = desktopMessageButtonRef.value?.contains(target) ?? false

  if (!clickedPopover && !clickedMobileButton && !clickedDesktopButton) {
    closeMessages()
  }
}

const handleResize = () => {
  if (isMessagesOpen.value) {
    nextTick(() => positionPopover())
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/" class="layout-topbar-logo">
        <img src="/jalin.svg" width="50" alt="Jalin logo" />
        <div class="h-8 w-px bg-gray-300"></div>
        <span class="font-bold">ATM - MP</span>
      </router-link>
    </div>

    <div ref="topbarActionsRef" class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
        </button>
      </div>

      <button
        ref="mobileMessageButtonRef"
        type="button"
        class="layout-topbar-action layout-topbar-profile layout-topbar-inbox lg:hidden"
        @click.stop="toggleMessages('mobile')"
        :aria-expanded="isMessagesOpen"
        aria-controls="layout-topbar-messages"
      >
        <span class="layout-topbar-inbox-icon">
          <i class="pi pi-inbox"></i>
          <span v-if="unreadCount" class="layout-topbar-inbox-badge">{{ unreadCount }}</span>
        </span>
        <span class="layout-topbar-action-label">Inbox</span>
        <i class="pi pi-chevron-down layout-topbar-profile-caret"></i>
      </button>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true,
        }"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <button type="button" class="layout-topbar-action layout-topbar-profile">
            <span class="layout-topbar-profile-avatar">
              <img src="/jalin.png" alt="Maila Alvianti" />
            </span>
            <span class="layout-topbar-action-label">Maila Alvianti</span>
            <i class="pi pi-chevron-down layout-topbar-profile-caret"></i>
          </button>
        </div>
      </div>

      <transition name="layout-topbar-popover">
        <div
          v-if="isMessagesOpen"
          id="layout-topbar-messages"
          ref="messagePopoverRef"
          class="layout-topbar-popover"
          :style="popoverStyles"
          role="dialog"
          aria-label="Message notifications"
        >
          <header class="layout-topbar-popover-header">
            <span class="layout-topbar-popover-title">Messages</span>
            <button type="button" class="layout-topbar-popover-close" @click="closeMessages">
              <i class="pi pi-times"></i>
            </button>
          </header>
          <ul class="layout-topbar-popover-list">
            <li v-if="!messages.length" class="layout-topbar-popover-empty">
              Tidak ada pesan baru
            </li>
            <li
              v-for="message in messages"
              :key="message.id"
              :class="['layout-topbar-popover-item', { 'is-unread': !message.read }]"
            >
              <button
                type="button"
                class="layout-topbar-popover-item-button"
                @click="markAsRead(message)"
              >
                <span class="layout-topbar-popover-item-icon">
                  <i :class="['pi', message.read ? 'pi-envelope-open' : 'pi-envelope']"></i>
                </span>
                <span class="layout-topbar-popover-item-content">
                  <span class="layout-topbar-popover-item-sender">{{ message.sender }}</span>
                  <span class="layout-topbar-popover-item-subject">{{ message.subject }}</span>
                  <span class="layout-topbar-popover-item-time">{{ message.time }}</span>
                </span>
              </button>
            </li>
          </ul>
          <footer class="layout-topbar-popover-footer">
            <button type="button" class="layout-topbar-popover-view-all">View all messages</button>
          </footer>
        </div>
      </transition>
    </div>
  </div>
</template>
