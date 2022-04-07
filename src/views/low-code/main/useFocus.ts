import {computed,ref} from 'vue'
import bus from '../../../public/bus'
export function useFocus(data:any,callback:any){
	
	let selectIndex = ref(-1)
	
	const selectBlock = computed(()=>data.value.blocks[selectIndex.value])
	
	// 清除focuse
	const clearFocusMain = function(){
		data.value.blocks.forEach((res: any)=>{
			if(res.focus){
				res.focus = false
			}
		})
		selectIndex.value = -1
		bus.emit("removeLineTip")
	}
	// 鼠标按下
	const blockMousedown = function(e:any,block:any,index:number){
		e.preventDefault()
		e.stopPropagation()
		if(!e.shiftKey){
			if(focusComputed.value.focus.length > 1){
				block.focus = true
			}else{
				clearFocusMain()
				if(!block.focus){
					block.focus = true
				}
			}
			
		}else{
			block.focus = !block.focus
		}
		selectIndex.value = index
		callback(e)
	}
	const focusComputed = computed(()=>{
		let focus = [] as any[]
		let unFocus = [] as any[]
		data.value.blocks.forEach((block: any)=> (block.focus?focus:unFocus).push(block))
		return{
			focus,
			unFocus
		}
	})
	// 清除全部选择
	const workMousedown = function(e:any){
		e.preventDefault()
		e.stopPropagation()
		clearFocusMain()
		
	}
	return{
		blockMousedown,
		workMousedown,
		focusComputed,
		selectBlock
	}
}