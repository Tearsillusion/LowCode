<template>
	<router-view />
</template>
<script lang="ts" setup>
	import {
		provide,
		onBeforeMount,
		watch
	} from "vue";
	import router from "./router";
	import store from './store'
	import { setRem } from './public/common'
	
	// 初始化
	setRem();
	// 改变窗口大小时重新设置 rem
	window.onresize = function () {
		setTimeout(()=>{
			setRem()
		},500)
	}
</script>
<style lang="scss">
	@import './public/common.scss'
</style>
