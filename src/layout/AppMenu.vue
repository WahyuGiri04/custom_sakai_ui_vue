<script setup lang="ts">
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

interface AppMenuOption {
  label?: string
  icon?: string
  to?: string
  url?: string
  target?: string
  class?: string
  items?: AppMenuOption[]
  command?: (payload: { originalEvent: Event; item: AppMenuOption }) => void
  visible?: boolean
  disabled?: boolean
  separator?: boolean
}

const model = ref<AppMenuOption[]>([
  {
    label: 'Dashboard',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
  },
  {
    label: 'Data',
    items: [
      {
        label: 'Transaction',
        icon: 'pi pi-fw pi-database',
        items: [
          {
            label: 'List of Transaction',
            icon: 'pi pi-fw pi-list',
            to: '/parameter',
          },
          {
            label: 'List of Transfer Suspect',
            icon: 'pi pi-fw pi-list-check',
            to: '/auth/error',
          }
        ],
      },
      {
        label: 'Claims',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Created Claims',
            icon: 'pi pi-fw pi-plus',
            to: '/parameter',
          },
          {
            label: 'Recived Claims',
            icon: 'pi pi-fw pi-folder-open',
            to: '/auth/error',
          },
          {
            label: 'List of Transfer Claims',
            icon: 'pi pi-fw pi-list-check',
            to: '/auth/error',
          }
        ],
      },
      {
        label: 'Other Claims',
        icon: 'pi pi-fw pi-clipboard',
        items: [
          {
            label: 'Created Other Claims',
            icon: 'pi pi-fw pi-folder-plus',
            to: '/parameter',
          },
          {
            label: 'Recived Other Claims',
            icon: 'pi pi-fw pi-folder-open',
            to: '/auth/error',
          }
        ],
      },
      { label: 'Download Report', icon: 'pi pi-fw pi-cloud-download', to: '/download' }
    ],
  },
  {
    label: 'Others',
    items: [
      {
        label: 'Activity Logs',
        icon: 'pi pi-fw pi-sync',
        to: '/landing',
      },
      {
        label: 'Contact Person',
        icon: 'pi pi-fw pi-address-book',
        to: '/contact'
      },
      {
        label: 'Calendar',
        icon: 'pi pi-fw pi-calendar-clock',
        to: '/pages/crud',
      },
      {
        label: 'Suporting Files',
        icon: 'pi pi-fw pi-file-check',
        to: '/pages/notfound',
      }
    ],
  }
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item.label ?? i">
      <AppMenuItem v-if="!item.separator" :item="item" :index="i"></AppMenuItem>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
