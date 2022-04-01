<template>
	<div class="low-code">
		<lowCodeEdit v-model="state" @onUpdate="stateUpdate"></lowCodeEdit>
	</div>
</template>

<script lang="ts">
	import lowCodeEdit from './low-code/lowCodeEdit'
	import { ref,provide,watch } from 'vue'
	import {registerConfig} from './low-code/main/mapping'
	const baseData = require('./low-code/lowCodeBase.json') 
	export default {
		components:{
			lowCodeEdit
		},
		setup(){
			provide("mapping",registerConfig)
			let state = ref<any>(baseData)
			
			function stateUpdate(res: any){
				state.value = res
			}
			return {
				state,
				stateUpdate
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
