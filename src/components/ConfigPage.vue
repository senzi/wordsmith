<template>
  <div class="config-page flex">
	<div class="w-full">
    <section class="theme-input mb-4">
      <h2 class="text-lg font-bold mb-2 text-center">输入主题（用于导出配置的文件名）</h2>
      <input v-model="theme" class="border p-2 w-full" placeholder="请输入英文和数字的主题" />
      <p v-if="themeError" class="text-red-500">{{ themeError }}</p>
    </section>
	<section class="variables-table">
	  <!-- 变量表格，提供增删改功能 -->
	  <h2 class="text-lg font-bold mb-4 text-center">编辑变量</h2>
		<div class="text-center">
		  <button @click="clearAllConfig" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-4">清空所有配置</button>
		</div>
	  <div class="grid grid-cols-1 gap-4">
		<!-- Whos -->
		<div class="card">
		  <div class="card-body">
			<h3 class="font-semibold mb-2 text-lg">Whos:</h3>
			<ul class="list-none">
			  <li v-for="(who, index) in whos" :key="index" class="flex items-center mb-2">
				<input v-model="whos[index]" class="border p-2 mr-2 rounded-md flex-1" />
				<button @click="removeWho(index)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">删除</button>
			  </li>
			</ul>
			<button @click="addWho" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mx-auto">添加 Who</button>
		  </div>
		</div>

		<!-- Wheres -->
		<div class="card">
		  <div class="card-body">
			<h3 class="font-semibold mb-2 text-lg">Wheres:</h3>
			<ul class="list-none">
			  <li v-for="(where, index) in wheres" :key="index" class="flex items-center mb-2">
				<input v-model="wheres[index]" class="border p-2 mr-2 rounded-md flex-1" />
				<button @click="removeWhere(index)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">删除</button>
			  </li>
			</ul>
			<button @click="addWhere" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mx-auto">添加 Where</button>
		  </div>
		</div>

		<!-- Actions -->
		<div class="card">
		  <div class="card-body">
			<h3 class="font-semibold mb-2 text-lg">Actions:</h3>
			<ul class="list-none">
			  <li v-for="(action, index) in actions" :key="index" class="flex items-center mb-2">
				<input v-model="actions[index]" class="border p-2 mr-2 rounded-md flex-1" />
				<button @click="removeAction(index)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">删除</button>
			  </li>
			</ul>
			<button @click="addAction" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mx-auto">添加 Action</button>
		  </div>
		</div>
	  </div>
	</section>
	</div>
    <div class="config-tools w-1/2 pl-4">
      <!-- 配置工具按钮和区域 -->
      <div v-if="showImport">
        <h2 class="text-lg font-bold mb-4">导入配置</h2>
        <input type="file" @change="handleFileUpload" class="mb-4" />
        <button @click="importFromBase64" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">使用文件导入</button>
        <textarea v-model="base64Config" placeholder="粘贴 base64 配置文本" class="border p-2 w-full h-48 mt-4"></textarea>
        <button @click="importFromBase64" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">文本配置导入</button>
      </div>
	<div v-if="showExport">
	  <h2 class="text-lg font-bold mb-4">导出配置</h2>
	  <!-- 复制配置按钮 -->
	  <button @click="copyConfigToClipboard" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">复制配置</button>
	  <!-- 下载 txt 文件按钮 -->
	  <button @click="exportToTxt" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">下载 txt 文件</button>
	  <!-- 配置文本的 textarea -->
	  <textarea readonly :value="exportedConfig" class="border p-2 w-full h-48 mt-4"></textarea>
	</div>
      <div class="flex mt-4">
        <button @click="toggleImport" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">导入</button>
        <button @click="toggleExport" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">导出</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAppStore } from '@/stores/store.js';
export default {
  data() {
    return {
      base64Config: '',
      exportedConfig: '',
      whos: [],
      wheres: [],
      actions: [],
      showImport: true,
      showExport: false,
	  theme: '',
	  themeError: null,
    };
  },
  created() {
    // 在组件创建时从 localStorage 加载数据
    this.loadDataFromLocalStorage();
  },
  watch: {
    whos: {
      handler() {
        this.updateExportedConfig();
		this.saveDataToLocalStorage();
      },
      deep: true
    },
    wheres: {
      handler() {
        this.updateExportedConfig();
		this.saveDataToLocalStorage();
      },
      deep: true
    },
    actions: {
      handler() {
        this.updateExportedConfig();
		this.saveDataToLocalStorage();
      },
      deep: true
    },
    theme: {
	  theme(newTheme) {
		this.validateTheme();
	  },
      handler() {
        this.validateTheme();
		this.saveDataToLocalStorage();
      },
      deep: true
    }
    // 监听其他需要实时更新的数据
  },
  methods: {
    clearAllConfig() {
      this.whos = [];
      this.wheres = [];
      this.actions = [];
      this.theme = '';
      this.saveDataToLocalStorage();
    },
		// 加载数据
	loadDataFromLocalStorage() {
	  console.log('Loading data from localStorage');
	  const savedWhos = localStorage.getItem('whos');
	  const savedWheres = localStorage.getItem('wheres');
	  const savedActions = localStorage.getItem('actions');
	  const savedTheme = localStorage.getItem('theme');

	  if (savedWhos) {
		try {
		  this.whos = JSON.parse((savedWhos));
		} catch (e) {
		  console.error('Error parsing whos from localStorage:', e);
		}
	  }
	  if (savedWheres) {
		try {
		  this.wheres = JSON.parse((savedWheres));
		} catch (e) {
		  console.error('Error parsing wheres from localStorage:', e);
		}
	  }
	  if (savedActions) {
		try {
		  this.actions = JSON.parse((savedActions));
		} catch (e) {
		  console.error('Error parsing actions from localStorage:', e);
		}
	  }
	  if (savedTheme) {
		this.theme = (savedTheme);
	  }

	  console.log('Loaded data:', {
		whos: this.whos,
		wheres: this.wheres,
		actions: this.actions,
		theme: this.theme
	  });
	},
    // 保存数据到 localStorage
		saveDataToLocalStorage() {
		  console.log('Saving data to localStorage');
		  localStorage.setItem('whos', (JSON.stringify(this.whos)));
		  localStorage.setItem('wheres', (JSON.stringify(this.wheres)));
		  localStorage.setItem('actions', (JSON.stringify(this.actions)));
		  localStorage.setItem('theme', (this.theme));
		},
    // 验证主题
    validateTheme() {
      const themeRegex = /^[A-Za-z0-9]+$/;
      if (!themeRegex.test(this.theme)) {
        this.themeError = '主题只能包含英文和数字。';
      } else {
        this.themeError = null;
        this.saveDataToLocalStorage(); // 主题验证通过后保存数据
      }
    },
	  copyConfigToClipboard() {
		if (this.exportedConfig) {
		  navigator.clipboard.writeText(this.exportedConfig)
			.then(() => {
			  // 复制成功后的操作，例如提示用户
			  alert('配置已复制到剪贴板！');
			})
			.catch(err => {
			  // 复制失败的操作
			  console.error('无法复制配置', err);
			});
		}
	  },
    toggleExport() {
      this.showImport = false;
      this.showExport = true;
    },
    addWho() {
      this.whos.push('');
    },
    removeWho(index) {
      this.whos.splice(index, 1);
    },
    addWhere() {
      this.wheres.push('');
    },
    removeWhere(index) {
      this.wheres.splice(index, 1);
    },
    addAction() {
      this.actions.push('');
    },
    removeAction(index) {
      this.actions.splice(index, 1);
    },
    handleFileUpload(event) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.base64Config = e.target.result;
      };
      fileReader.readAsText(event.target.files[0]);
    },
	importFromBase64() {
	  try {
		const jsonConfig = this.base64DecodeUnicode(this.base64Config);
		const config = JSON.parse(jsonConfig);
		this.whos = config.whos || [];
		this.wheres = config.wheres || [];
		this.actions = config.actions || [];
		// 需要导入其他数据时，继续添加
	  } catch (e) {
		console.error('配置导入失败', e);
		// TODO: 添加用户友好的错误提示
	  }
	},

	base64DecodeUnicode(str) {
	  // 先将 Base64 编码的 ASCII 字符串转换为百分比编码的字符串
	  const percentEncodedStr = atob(str).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	  }).join('');

	  // 然后使用 decodeURIComponent 对其进行解码
	  return decodeURIComponent(percentEncodedStr);
	},
	updateExportedConfig() {
	  const config = {
		whos: this.whos,
		wheres: this.wheres,
		actions: this.actions,
		// 其他需要导出的数据
	  };
	  const jsonConfig = JSON.stringify(config);
	  this.exportedConfig = this.base64EncodeUnicode(jsonConfig);
	},

	base64EncodeUnicode(str) {
	  // 首先转换为 RFC3986 编码的URI组件，再转换为base64编码
	  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
		return String.fromCharCode('0x' + p1);
	  }));
	},
    exportToBase64() {
      this.updateExportedConfig();
    },
	exportToTxt() {
	  // 确保 exportedConfig 是一个字符串
	  if (typeof this.exportedConfig !== 'string') {
		console.error('exportedConfig 不是一个字符串');
		return;
	  }

	  // 创建一个 Blob 对象，包含 exportedConfig 的内容
	  const blob = new Blob([this.exportedConfig], { type: 'text/plain;charset=utf-8' });

	  // 创建一个下载链接
	  const url = URL.createObjectURL(blob);
	  const link = document.createElement('a');
	  link.href = url;
	  link.download = this.theme ? `${this.theme}_config.txt` : 'config.txt';
	  link.style.display = 'none'; // 隐藏下载链接，避免在页面上显示
	  document.body.appendChild(link); // 将链接添加到文档中
	  link.click(); // 触发下载
	  document.body.removeChild(link); // 下载完成后移除链接
	  URL.revokeObjectURL(url); // 释放 URL 对象
	},
  },
  mounted() {
    this.updateExportedConfig();
  }
};
</script>

<style scoped>
/* TailwindCSS/DaisyUI样式 */
/* 样式代码根据需要自行添加 */
</style>