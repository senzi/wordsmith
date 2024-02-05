<template>
	<div class="flex flex-col h-screen justify-between">
		<!-- Content -->
		<main class="flex-grow container mx-auto p-4">
			<header class="title text-3xl text-center my-6">WordSmith</header>
			<section class="sentence text-center my-6">
				<span class="variable mx-1 bg-blue-100 text-blue-800 py-2 px-4 rounded">{{ randomWho }}</span>
				<span class="variable mx-1 bg-blue-100 text-blue-800 py-2 px-4 rounded">{{ randomWhere }}</span>
				<span class="variable mx-1 bg-blue-100 text-blue-800 py-2 px-4 rounded">{{ randomAction }}</span>
			</section>
			<div class="text-center">
				<button @click="generateSentence"
					class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4">
					点击生成
				</button>
			</div>
			<!-- History Card -->
			<section class="history my-6 mx-auto p-4 max-w-xl bg-base-300 rounded-lg shadow-md">
				<ul class="list-none text-center text-lg">
					<!-- History Card List Item -->
					<li v-for="(item, index) in history.slice(0, 20)" :key="index"
						class="flex items-center justify-center my-2">
						<!-- Space for the NEW tag or placeholder for alignment -->
						<span :class="{'new-tag': index === 0, 'tag-space': true}">
							<span v-if="index === 0" class="text-s mr-2">
								NEW
							</span>
						</span>
						<!-- Timestamp and sentence container -->
						<div
							:class="{'bg-neutral': index === 0, 'flex-grow': true, 'rounded-md': index === 0, 'py-2': index === 0, 'px-4': index === 0}">
							<!-- Timestamp tag -->
							<span
								class="timestamp-tag bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold mr-2">
								{{ item.timestamp }}
							</span>
							{{ item.sentence }}
						</div>
					</li>
				</ul>
			</section>
		</main>
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

				whos: [],
				wheres: [],
				actions: [],
				history: [],
				randomWho: '',
				randomWhere: '',
				randomAction: '',
				theme: '',
			};
		},
		setup() {
			// 创建响应式引用来存储数据
			const whos = ref([]);
			const wheres = ref([]);
			const actions = ref([]);
			const theme = ref('');

			// 在组件挂载后调用 loadDataFromLocalStorage 方法
			onMounted(() => {
				loadDataFromLocalStorage();
			});

			// 加载数据的方法
			function loadDataFromLocalStorage() {
				const savedWhos = localStorage.getItem('whos');
				const savedWheres = localStorage.getItem('wheres');
				const savedActions = localStorage.getItem('actions');
				const savedTheme = localStorage.getItem('theme');

				if (savedWhos) {
					try {
						whos.value = JSON.parse(savedWhos);
					} catch (e) {
						console.error('Error parsing whos from localStorage:', e);
					}
				}
				if (savedWheres) {
					try {
						wheres.value = JSON.parse(savedWheres);
					} catch (e) {
						console.error('Error parsing wheres from localStorage:', e);
					}
				}
				if (savedActions) {
					try {
						actions.value = JSON.parse(savedActions);
					} catch (e) {
						console.error('Error parsing actions from localStorage:', e);
					}
				}
				if (savedTheme) {
					theme.value = savedTheme;
				}

				console.log('Loaded data:', {
					whos: whos.value,
					wheres: wheres.value,
					actions: actions.value,
					theme: theme.value
				});
			}

			// 返回响应式引用
			return {
				whos,
				wheres,
				actions,
				theme,
				// ... 其他需要返回的响应式数据 ...
			};
		},
		methods: {
			generateSentence() {
				// 检查数组是否包含有效数据
				const hasValidData = this.whos.length > 0 && this.wheres.length > 0 && this.actions.length > 0;
				if (!hasValidData) {
					alert('信息不足，请到配置页面添加或到预设页面套用默认预设');
					return; // 如果数据不足，不执行生成句子的操作
				}

				// 如果数据充足，继续生成句子
				const randomWho = this.getRandomElement(this.whos);
				const randomWhere = this.getRandomElement(this.wheres);
				const randomAction = this.getRandomElement(this.actions);
				this.randomWho = randomWho;
				this.randomWhere = randomWhere;
				this.randomAction = randomAction;
				const newSentence = {
					sentence: `${randomWho}在${randomWhere}${randomAction}。`,
					timestamp: this.currentTimestamp()
				};
				this.history.unshift(newSentence); // 添加新句子到 history
			},
			getRandomElement(array) {
				// 过滤掉空字符串，然后随机选择一个元素
				const nonEmptyArray = array.filter(item => item !== '');
				return nonEmptyArray[Math.floor(Math.random() * nonEmptyArray.length)];
			},
			currentTimestamp() {
				return new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit'
				});
			}
		}
	};
</script>
<style scoped>
	/* TailwindCSS/DaisyUI样式 */

	/* NEW tag visible styling */
	.new-tag {
		display: inline-block;
		width: 50px;
		/* Adjust to match the NEW tag width with padding */
		height: 20px;
		/* Adjust to match the NEW tag height */
		color: red;
		/* Text color, ensure high contrast against the background */
		text-align: center;
		border-radius: 4px;
		/* Optional: if you want rounded corners */
		line-height: 20px;
		/* Align text vertically */
	}

	li .new-tag {
		flex-shrink: 0;
	}

	/* Placeholder space to align items properly even without the NEW tag */
	.tag-space {
		display: inline-block;
		width: 50px;
		/* Adjust the width as needed to match the NEW tag */
		/* The margin-right should match the margin of the .new-tag if any */
	}

	/* Additional padding consideration for the first item */
	li:first-child .tag-space {
		/* Adjust this if your NEW tag has padding that impacts alignment */
	}

	/* Ensure that the timestamp tag does not cause misalignment */
	li .timestamp-tag {
		flex-shrink: 0;
	}

	/* Flex-grow for the sentence */
	li div.flex-grow {
		flex-grow: 1;
		text-align: left;
		padding-left: 16px;
	}
</style>