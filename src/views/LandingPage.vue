<script setup lang="ts">
import HeroWidget from '@/components/landing/HeroWidget.vue'
import TopbarWidget from '@/components/landing/TopbarWidget.vue'
</script>

<template>
  <div class="bg-surface-0">
    <div id="home" class="landing-wrapper overflow-hidden">
      <div
        class="py-2 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static"
      >
        <TopbarWidget />
      </div>
      <HeroWidget />
    </div>
  </div>
</template>
