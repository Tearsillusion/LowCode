import deepcopy from 'deepcopy';
import bus from '../../../public/bus'
import {onUnmounted,onMounted} from 'vue'
export function useCopy(focusComputed:any,data:any,workCanvasRef:any,scaleShow:any,scaleValue:any,callback:any){
	
	let saveSelectBlock = null as any
	
	let onkeydown = (e:any)=>{
		console.log(e)
		// ctrl + c
		if(e.ctrlKey && e.which === 67){
			if(focusComputed.value.focus){
				saveSelectBlock = deepcopy(focusComputed.value.focus)
				bus.emit('start')
			}
		}
		// ctrl + v
		if(e.ctrlKey && e.which === 86){
			if(saveSelectBlock){
				saveSelectBlock.map((res:any)=>data.value.blocks.push(res))
				bus.emit('end')
			}	
		}
		// ctrl + x 删除
		if(e.ctrlKey && e.which === 88){
			if(focusComputed.value.focus){
				saveSelectBlock = deepcopy(focusComputed.value.focus)
				bus.emit('start')
			}
			if(saveSelectBlock){
				saveSelectBlock.forEach((val:any,k:number)=>{
					data.value.blocks.forEach((res:any,index:number)=>{
						if(JSON.stringify(res) === JSON.stringify(val)){
							data.value.blocks.splice(index,1)
						}
					})
				})
				bus.emit('end')
			}
		}
		// ctrl + z 撤销
		if(e.ctrlKey && e.which === 90){
			callback(1)
		}
		// ctrl + y 前进
		if(e.ctrlKey && e.which === 89){
			callback(2)	
		}
		
	}
	// 监听鼠标滚动,实现画布的缩放
	let scale = 1
	let scaleTimeOut = null as any
	const scrollFunc = (e:any)=>{
		
		if(e.shiftKey){
			if(e.wheelDeltaY > 0){
				// 上滚放大
				scale = scale + 0.05
				workCanvasRef.value.style.transform = `scale(${scale})`
			}else{
				// 下滚缩小
				scale = scale - 0.05
				workCanvasRef.value.style.transform = `scale(${scale})`
			}
			scaleValue.value = (scale*100).toFixed(0)+'%'
			scaleShow.value = true
			if(scaleTimeOut){
				clearTimeout(scaleTimeOut)
			}
			scaleTimeOut = setTimeout(()=>{
				scaleShow.value = false
			},2000)
		}
	}
	
	// 移除keydown事件
	const removeKeypress = (val:any)=>{
		if(val === 1){
			document.removeEventListener("keydown", onkeydown)
		}else{
			document.addEventListener("keydown", onkeydown)
		}
	}
	
	bus.on("removeKeypress",removeKeypress)
	document.addEventListener("keydown", onkeydown)
	document.addEventListener('mousewheel',scrollFunc);
	
	onUnmounted(()=>{
		document.removeEventListener("keydown", onkeydown)
		document.removeEventListener('mousewheel',scrollFunc);
		bus.off("removeKeypress",removeKeypress)
	})
	return;
}