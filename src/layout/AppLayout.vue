<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppTopbar from './AppTopbar.vue'
</script>

<template>
  <div class="layout-wrapper">
    <AppTopbar></AppTopbar>
    <div class="layout-main-container">
      <div class="layout-main">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
