<script setup lang="ts">
import { useLayout } from './composables/layout'

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout()
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/" class="layout-topbar-logo">
        <img src="/jalin.svg" width="50px" />
        <div class="h-8 w-px bg-gray-300"></div>
        <span class="font-bold">ATM - MP</span>
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
        </button>
      </div>
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
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-calendar"></i>
            <span class="layout-topbar-action-label">Calendar</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <span
              class="relative mr-2 flex h-full w-full items-center justify-center lg:mr-0"
            >
              <i class="pi pi-inbox"></i>
              <span
                class="absolute -top-0.5 -right-0.5 flex h-5 min-w-[1.25rem] translate-x-[15%] -translate-y-[15%] items-center justify-center rounded-full border-2 border-[var(--surface-card)] bg-red-500 px-1 text-xs font-semibold leading-none text-white shadow pointer-events-none"
              >
                1
              </span>
            </span>
            <span class="layout-topbar-action-label">Messages</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-user"></i>
            <span class="layout-topbar-action-label">Profile</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
