<template>
  <div class="flex flex-col h-screen">
    <!-- Appbar -->
    <nav class="appbar flex items-center justify-center p-4 bg-blue-500 text-white">
      <RouterLink to="/" class="mx-2">主页</RouterLink>
      <RouterLink to="/config" class="mx-2">配置</RouterLink>
	  <RouterLink to="/presets" class="mx-2">预设</RouterLink>
    </nav>

    <!-- Content area -->
    <main class="flex-grow p-8">
      <div class="max-w-4xl mx-auto">
        <RouterView/>
      </div>
    </main>

    <!-- Footer -->
    <footer class="p-4 bg-gray-200 text-center">
      © 2024
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
/* TailwindCSS/DaisyUI样式 */
</style>