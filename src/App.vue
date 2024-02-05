<template>
  <div class="flex flex-col h-screen">
    <!-- Appbar -->
    <nav class="appbar flex items-center justify-center p-4 bg-blue-500 text-white">
      <RouterLink to="/" class="mx-2">主页</RouterLink>
      <RouterLink to="/config" class="mx-2">配置</RouterLink>
      <RouterLink to="/presets" class="mx-2">预设</RouterLink>
    </nav>

    <!-- Content area -->
    <main class="flex-grow p-8 md:px-4">
      <div class="max-w-4xl mx-auto md:max-w-full">
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
/* 基础样式 */
.main {
  /* 这里可以添加一些基础样式，比如背景色等 */
}

/* 响应式样式 */
@media (max-width: 768px) {
  .main {
    padding: 0; /* 在移动端移除左右内边距 */
  }
  .max-w-4xl {
    max-width: 100%; /* 在移动端设置最大宽度为100% */
  }
}
</style>