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
		    <template #footer>
		      <span class="dialog-footer">
		        <el-button @click="dialogExport = false">Cancel</el-button>
		        <el-button type="primary" @click="onExportClick">Confirm</el-button
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
			// 导出确定框
			function onExportClick(){
				useExport(exportType.value,exportDom.value)
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
				exportType
			}
		}
		
	}
	
</script>

<style lang="scss">
	.low-code{
		width: 100%;
		height: 100%;
	}
</style>
