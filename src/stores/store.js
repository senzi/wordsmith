// store.js
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    whos: [],
    wheres: [],
    actions: [],
    theme: '',
  }),
  actions: {
    setWhos(whos) {
      this.whos = whos;
    },
    setWheres(wheres) {
      this.wheres = wheres;
    },
    setActions(actions) {
      this.actions = actions;
    },
    setTheme(theme) {
      this.theme = theme;
    },
    // 添加一个 action 来保存数据
    saveData() {
      this.setWhos(this.whos);
      this.setWheres(this.wheres);
      this.setActions(this.actions);
      this.setTheme(this.theme);
    },
  },
});