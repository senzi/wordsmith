<template>
	<div class="presets-page">
		<div class="presets grid grid-cols-3 gap-4">
			<div v-for="(preset, index) in presets" :key="index" class="preset-card">
				<div class="preset-name text-center">
					<input v-if="index !== 0" v-model="preset.name" @input="savePreset(index)" placeholder="预设名" />
					<span v-else class="preset-name-input">{{ preset.name }}</span>
				</div>
				<div class="preset-actions mt-4">
					<button @click="applyPreset(index)" class="apply-button">套用</button>
				</div>
				<textarea v-model="preset.base64" @input="savePreset(index)" placeholder="Base64字符串" class="w-full" />
			</div>
			<div v-if="presets.length < 12" class="preset-card add-preset">
				<button @click="addPreset" class="add-preset-button">+ 新增预设</button>
			</div>
		</div>
		<div v-if="successMessage" class="success-message">{{ successMessage }}</div>
	</div>
</template>


<script>
	import {
		ref,
		onMounted
	} from 'vue';

	export default {
		data() {
			return {
				presets: [
					// 默认预设，留空供填写
					{
						name: '默认预设(迷家)',
						base64: 'eyJ3aG9zIjpbIuWFieWulyIsIuecn+WSsiIsIumjkuS6uiIsIuWwj+aYpSIsIueTpuWwlOWNoee6syIsIuWHm+mfsyIsIuiInuiIniIsIuWwj+ecn+eIsSIsIuadsOWFiyIsIue+juW9seWTjSIsIuWNl+afryIsIui+vuWTiOaLiSIsIuWxseWGhSIsIuWcsOeLseeahOS4mueBqyIsIuWWteWkqiIsIuixhuWltuaLv+mTgSIsIueDreW4puWknCIsIuS4h+mDqCIsIlDnorMiLCLlhrDnu5PnmoTliqDlkInmtoXmlq8iLCLpuJ/lrokiLCLpk5zplKPljavpl6giLCLmsarlrZDlubTns5UiLCLkv4rku5QiLCLkvJjlpYgiLCLkvJjpn7MiLCLkvJjkuYMiLCLlpYjpgqMiLCLlm5vku5QiLCLlmZflrZAiLCLlj7jmnLoiXSwid2hlcmVzIjpbIue6s+m4o+adkSIsIuaiqOW3neadkSIsIuW3tOWjqyIsIumap+mBkyIsIuW6n+W8g+aIv+WxiyIsIua5luaziiIsIuW6n+W8g+aIv+Wxi+eahOahjOWtkOS4iiIsIuadkeW6hOeahOmbhuS8muWcuuaJgCIsIuajruael+Wwj+mBkyIsIuWxsemhtuinguaZr+eCuSJdLCJhY3Rpb25zIjpbIuaOoue0ouW6n+W8g+W7uuetkSIsIuWbtOWdkOiuqOiuuiIsIuS6ieWQteWSjOaMh+i0oyIsIuaQnOmbhueJqei1hOWSjOmjn+eJqSIsIuWwneivlemAmuiur+iuvuWkhyIsIuiusOW9leaXpeW/lyIsIui/m+ihjOiHquaIkeWPjeecgSIsIuWkhOWIkSIsIui/m+ihjOelreWloCJdfQ=='
					},
					// 其他预设...
				],
				successMessage: null,
			};
		},
		methods: {
			savePreset(index) {
				console.log(`保存预设 ${index}:`, this.presets[index]);
				localStorage.setItem(`preset_${index}`, JSON.stringify(this.presets[index]));
				this.successMessage = `预设 ${index} 已保存。`;
			},
			applyPreset(index) {
				const preset = this.presets[index];
				if (preset.base64) {
					try {
						const jsonConfig = this.base64DecodeUnicode(preset.base64);
						const config = JSON.parse(jsonConfig);
						this.saveDataToLocalStorage(config);
						this.successMessage = '预设已成功套用。';
					} catch (e) {
						console.error('解析Base64字符串失败:', e);
						this.successMessage = '预设套用失败。';
					}
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
			saveDataToLocalStorage(config) {
				localStorage.setItem('whos', JSON.stringify(config.whos || []));
				localStorage.setItem('wheres', JSON.stringify(config.wheres || []));
				localStorage.setItem('actions', JSON.stringify(config.actions || []));
			},
			loadDataFromLocalStorage() {
				// 从localStorage加载预设数据
				for (let i = 0; i < localStorage.length; i++) {
					const key = localStorage.key(i);
					if (key.startsWith('preset_')) {
						const index = parseInt(key.split('_')[1], 10);
						const preset = JSON.parse(localStorage.getItem(key));
						this.presets[index] = preset;
					}
				}
			},
			addPreset() {
				this.presets.push({
					name: '',
					base64: ''
				});
			},
		},
		mounted() {
			this.loadDataFromLocalStorage();
		},
	};
</script>

<style scoped>
	.readonly-text {
		padding: 1rem;
		/* 添加内边距 */
		border: none;
		background-color: transparent;
		cursor: default;
	}

	.success-message {
		margin-top: 2rem;
		padding: 1rem;
		background-color: #e2f0f1;
		border-radius: 0.5rem;
		color: #34a853;
	}

	.presets-page {
		/* TailwindCSS/DaisyUI样式 */
		padding: 2rem;
	}

	.presets {
		gap: 1rem;
	}

	.preset-card {
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.preset-name input {
		width: 100%;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}

	.preset-name {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.preset-name-input {
		padding: 0.5rem;
		/* 添加内边距 */
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		background-color: #3b3b3b;
		cursor: default;
	}

	.preset-actions {
		text-align: center;
		margin: 1rem;
	}

	.apply-button {
		padding: 0.5rem 1rem;
		background-color: #10b981;
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.add-preset {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.add-preset-button {
		padding: 0.5rem 1rem;
		background-color: #f59e0b;
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	textarea {
		resize: vertical;
		min-height: 6rem;
		max-height: 6rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}
</style>