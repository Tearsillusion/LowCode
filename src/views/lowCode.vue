<template>
	<div class="low-code">
		<lowCodeEdit v-model="state" @onUpdate="stateUpdate" @onExport="setExport"></lowCodeEdit>
		<el-dialog v-model="dialogExport" title="导出类型选择" width="30%" draggable>
		    <el-radio-group v-model="exportType">
		        <el-radio :label="1">静态HTML</el-radio>
		        <el-radio :label="2">Vue</el-radio>
		        <el-radio :label="3">React</el-radio>
				<el-radio :label="4">小程序</el-radio>
		    </el-radio-group>
			<div><el-checkbox v-model="cssSplitValue">CSS是否分离</el-checkbox></div>
		    <template #footer>
		      <span class="dialog-footer">
		        <el-button @click="dialogExport = false">Cancel</el-button>
		        <el-button type="primary" @click="onExportClick">Confirm</el-button
		        >
		      </span>
		    </template>
		</el-dialog>
		<el-dialog v-model="dialogCopy" title="界面源码" width="30%" draggable>
		    <div class="copy-html" ref="copyHtmlRef">
				<textarea ref="textAreaRef" rows="" cols="" :value="copyHtmlCode"></textarea> 
			</div>
		    <template #footer>
		      <span class="dialog-footer">
		        <el-button @click="dialogCopy = false">Cancel</el-button>
		        <el-button type="primary" @click="onCopyClick">Copy</el-button
		        >
		      </span>
		    </template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
	import lowCodeEdit from './low-code/lowCodeEdit'
	import { ref,provide,watch } from 'vue'
	import {registerConfig} from './low-code/main/mapping'
	import {useExport} from './low-code/main/useExport'
	import { ElMessage } from 'element-plus'
	const baseData = require('./low-code/lowCodeBase.json') 
	export default {
		components:{
			lowCodeEdit
		},
		setup(){
			provide("mapping",registerConfig)
			let state = ref<any>(baseData)
			let dialogExport = ref<Boolean>(false)
			let exportType = ref<Number>(1)
			let exportDom = null as any
			let dialogCopy = ref<Boolean>(false)
			let copyHtmlRef = ref<any>(null)
			let copyHtmlCode = ref<any>("")
			let cssSplitValue = ref<Boolean>(true)
			let textAreaRef = ref<any>(null)
			// copy代码
			function onCopyClick(){
				textAreaRef.value.select()
				document.execCommand("copy");
				ElMessage({
				    message: '复制成功',
				    type: 'success',
				})
			}
			// 导出确定框
			function onExportClick(){
				useExport(exportType.value,exportDom.value,cssSplitValue.value,(val:string)=>{
					copyHtmlCode.value = val
					dialogExport.value = false
					dialogCopy.value = true
				})
			}
			// 展示导出选择框
			function setExport(dom:any){
				exportDom = dom
				dialogExport.value = true
			}
			// 监听数据变化
			function stateUpdate(res: any){
				state.value = res
			}
			return {
				state,
				stateUpdate,
				setExport,
				onExportClick,
				dialogExport,
				exportType,
				dialogCopy,
				copyHtmlRef,
				onCopyClick,
				copyHtmlCode,
				cssSplitValue,
				textAreaRef
			}
		}
		
	}
	
</script>

<style lang="scss">
	.low-code{
		width: 100%;
		height: 100%;
		.copy-html{
			
			textarea{
				width: 100%;
				height: 500px;
				background-color: #222;
				color: #abb2bf;
				font-size: 16px;
				font-weight:bold;
			}
		}
	}
</style>
