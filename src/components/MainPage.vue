<template>
  <div class="app">
    <nav class="appbar"> <!-- AppBar组件 --> </nav>
    <header class="title">WordSmith</header>
    <section class="sentence">
      <span class="variable">{{ who }}</span>
      <span class="variable">{{ where }}</span>
      <span class="variable">{{ action }}</span>
    </section>
    <button @click="generateSentence">点击生成</button>
    <section class="history">
      <ul>
        <li v-for="(sentence, index) in history.slice(0, 10)" :key="index">
          {{ sentence }}
        </li>
      </ul>
    </section>
    <footer class="footer"> <!-- Footer组件 --> </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      who: '',
      where: '',
      action: '',
      history: [],
      // 变量数组，可以从配置获取
      whos: ['小明', '老师', '医生'],
      wheres: ['学校', '医院', '超市'],
      actions: ['学习', '治疗', '购物'],
    };
  },
  methods: {
    generateSentence() {
      this.who = this.getRandomElement(this.whos);
      this.where = this.getRandomElement(this.wheres);
      this.action = this.getRandomElement(this.actions);
      this.history.unshift(`${this.who} 在 ${this.where} ${this.action}`);
    },
    getRandomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  }
};
</script>

<style scoped>
/* TailwindCSS/DaisyUI样式 */
</style>