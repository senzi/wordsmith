<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav class="appbar">
    <router-link to="/">主页</router-link>
    <router-link to="/config">配置</router-link>
  </nav>
  <router-view/>
</template>

<style scoped>

</style>
