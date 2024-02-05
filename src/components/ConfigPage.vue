<template>
  <div class="config-page">
    <section class="variables-table">
      <!-- 变量表格，提供增删改功能 -->
    </section>
    <section class="config-tools">
      <!-- 配置工具按钮和区域 -->
      <button @click="importFromBase64">上传配置文件</button>
      <textarea v-model="base64Config"></textarea>
      <button @click="exportToBase64">导出配置</button>
      <button @click="saveConfig">保存配置</button>
      <div class="exported-config">{{ exportedConfig }}</div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      base64Config: '',
      exportedConfig: '',
      whos: [],
      wheres: [],
      actions: [],
      // 其他所需数据
    };
  },
  methods: {
    importFromBase64() {
      // 解析base64配置并更新变量
    },
    exportToBase64() {
      // 将变量转换为base64配置
    },
    saveConfig() {
      // 保存配置到本地或后端
    },
    // 其他方法
  }
};
</script>

<style scoped>
/* TailwindCSS/DaisyUI样式 */
</style>