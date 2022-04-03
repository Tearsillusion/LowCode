import {onBeforeUnmount} from 'vue'
import bus from '../../../public/bus'
export function useMenuDrag(workCanvasRef:any,data:any){
	
	let currentComponent = null as any
	
	const dragenter = function(e:any){
		// 进入目标元素
		e.dataTransfer.dropEffect = 'move'
	}
	const dragover = function(e:any){
		// 在目标元素中拖拽
		e.preventDefault()
	}
	const dragleave = function(e:any){
		e.dataTransfer.dropEffect = 'none'
		// 离开目标元素
	}
	const drop = function(e:any){
		console.log(e)
		// 放下
		let blocks = data.value.blocks
		data.value = {
			...data.value,
			blocks:[
				...blocks,
				{
					left:e.offsetX,
					top:e.offsetY,
					zIndex:1,
					key:currentComponent.key,
					aliginCenter:true
				}
			]
		}
		currentComponent = null
	}
	const dragStartMain = function(res:any){
		currentComponent = res
		workCanvasRef.value.addEventListener("dragenter",dragenter)
		workCanvasRef.value.addEventListener("dragover",dragover)
		workCanvasRef.value.addEventListener("dragleave",dragleave)
		workCanvasRef.value.addEventListener("drop",drop)
		bus.emit('start')
	}
	
	const dragendMain = function(){
		workCanvasRef.value.removeEventListener("dragenter",dragenter)
		workCanvasRef.value.removeEventListener("dragover",dragover)
		workCanvasRef.value.removeEventListener("dragleave",dragleave)
		workCanvasRef.value.removeEventListener("drop",drop)
		bus.emit('end')
	}
	
	bus.on("dragStartEmit",dragStartMain)
	bus.on("dragendEmit",dragendMain)
	
	onBeforeUnmount(()=>{
		bus.off("dragStartMain",dragStartMain)
		bus.off("dragendEmit",dragendMain)
		workCanvasRef.value.removeEventListener("dragenter",dragenter)
		workCanvasRef.value.removeEventListener("dragover",dragover)
		workCanvasRef.value.removeEventListener("dragleave",dragleave)
		workCanvasRef.value.removeEventListener("drop",drop)
	})
	
	return{
		dragenter,
		drop
	}
}