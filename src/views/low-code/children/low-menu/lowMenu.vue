<template>
	<el-dropdown>
		<span class="el-dropdown-link">
			视图
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</span>
		<template #dropdown>

		</template>
	</el-dropdown>
	<el-dropdown>
		<span class="el-dropdown-link">
			工具
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</span>
		<template #dropdown>

		</template>
	</el-dropdown>
	<el-dropdown>
		<span class="el-dropdown-link">
			帮助
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="shortcutsClick">快捷键说明</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>

</template>

<script lang="ts" setup>
	import {
		ArrowDown
	} from '@element-plus/icons-vue'
	import { ElMessageBox } from 'element-plus'
	
	// 快捷键
	const shortcutsClick=()=>{
		let code = `
			<div class="shortcuts">
				<div>ctrl + c: 复制</div>
				<div>ctrl + v: 粘贴</div>
				<div>ctrl + x: 删除</div>
				<div>ctrl + z: 撤销</div>
				<div>ctrl + y: 还原</div>
				<div>shift + r: 预览</div>
				<div>shift + e: 导出</div>
				<div>按住shift点击: 多个选择</div>
				<div>按住shift鼠标滚动: 画布缩放</div>
				<div>属性区修改值后按Enter键保存,失去焦点得同时也会自动保存</div>
			</div>
		`
		
		ElMessageBox.alert(
		    code,
		    '快捷键大全',
		    {
		      dangerouslyUseHTMLString: true,
		    }
		  )
	}
	
	if(!localStorage.getItem("shortcutsShow")){
		shortcutsClick()
		localStorage.setItem("shortcutsShow",1)
	}
	
</script>

<style lang="scss">
	.el-dropdown-link {
		color: white;
		cursor: pointer;
	}
	.shortcuts{
		font-size: 16px;
		letter-spacing: 1px;
		div{
			margin-top: 5px;
		}
	}
</style>
