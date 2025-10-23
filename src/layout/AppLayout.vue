<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppTopbar from './AppTopbar.vue'
import AppSidebar from './AppSidebar.vue'
</script>

<template>
  <div class="layout-wrapper">
    <AppTopbar></AppTopbar>
    <AppSidebar></AppSidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <RouterView />
      </div>
    </div>
  </div>
</template>
