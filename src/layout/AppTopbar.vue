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
    popoverAnchor.value === 'desktop' ? desktopMessageButtonRef.value : mobileMessageButtonRef.value

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
      anchorRect.left + anchorRect.width / 2 - containerRect.left - popoverRect.width / 2
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

const closeMessages = () => {
  isMessagesOpen.value = false
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

const op = ref()
const members = ref([
  { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
  {
    name: 'Bernardo Dominic',
    image: 'bernardodominic.png',
    email: 'bernardo@email.com',
    role: 'Editor',
  },
  { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' },
])

const toggle = (event: MouseEvent) => {
  op.value?.toggle(event)
}
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
        @click="toggle"
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
              <img src="/sample-avatar.jpg" alt="Maila Alvianti" />
            </span>
            <span class="layout-topbar-action-label">Maila Alvianti</span>
          </button>
        </div>
      </div>

      <Popover ref="op">
        <div class="flex flex-col gap-4 w-[25rem]">
          <div>
            <span class="font-medium block mb-2">Share this document</span>
            <InputGroup>
              <InputText
                value="https://primevue.org/12323ff26t2g243g423g234gg52hy25XADXAG3"
                readonly
                class="w-[25rem]"
              ></InputText>
              <InputGroupAddon>
                <i class="pi pi-copy"></i>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div>
            <span class="font-medium block mb-2">Invite Member</span>
            <InputGroup>
              <InputText disabled />
              <Button label="Invite" icon="pi pi-users"></Button>
            </InputGroup>
          </div>
          <div>
            <span class="font-medium block mb-2">Team Members</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-4">
              <li v-for="member in members" :key="member.name" class="flex items-center gap-2">
                <img
                  :src="`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`"
                  style="width: 32px"
                />
                <div>
                  <span class="font-medium">{{ member.name }}</span>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    {{ member.email }}
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 text-surface-500 dark:text-surface-400 ml-auto text-sm"
                >
                  <span>{{ member.role }}</span>
                  <i class="pi pi-angle-down"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Popover>
    </div>
  </div>
</template>
