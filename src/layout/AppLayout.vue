<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useLayout } from './composables/layout'
import AppTopbar from './AppTopbar.vue'
import AppSidebar from './AppSidebar.vue'

const { layoutConfig, layoutState, isSidebarActive } = useLayout()

const outsideClickListener = ref<((event: MouseEvent) => void) | null>(null)

// Mengawasi perubahan status sidebar untuk menyalakan atau mematikan listener klik global.
watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener()
  } else {
    unbindOutsideClickListener()
  }
})

// Menghasilkan kelas CSS container berdasarkan konfigurasi dan status layout saat ini.
const containerClass = computed(() => {
  return {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
  }
})

// Menambahkan listener klik pada dokumen untuk menutup menu ketika klik di luar.
function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false
        layoutState.staticMenuMobileActive = false
        layoutState.menuHoverActive = false
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}

// Menghapus listener klik dokumen ketika sidebar sudah tertutup.
function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value)
    outsideClickListener.value = null
  }
}

// Menentukan apakah target klik berada di luar sidebar dan tombol menu.
function isOutsideClicked(event: MouseEvent) {
  const sidebarEl = document.querySelector('.layout-sidebar')
  const topbarEl = document.querySelector('.layout-menu-button')
  const target = event.target as Node | null

  if (!sidebarEl || !topbarEl || !target) {
    return false
  }

  return !(
    sidebarEl.isSameNode(target) ||
    sidebarEl.contains(target) ||
    topbarEl.isSameNode(target) ||
    topbarEl.contains(target)
  )
}
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <AppTopbar></AppTopbar>
    <AppSidebar></AppSidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <RouterView />
      </div>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
</template>
