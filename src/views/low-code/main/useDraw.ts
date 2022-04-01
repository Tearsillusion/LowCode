import {onUnmounted} from 'vue'
import bus from '../../../public/bus'
import deepcopy from 'deepcopy';
export function useDraw(focusData: any,data:any){
	
	let state = {
		startX:0 as any,
		startY:0 as any,
		label:"" as string,
		blockFocus:[] as any
	}
	
	// 鼠标按下
	const mouseDown = (res:any)=>{
		let {event,label} = res
		state = {
			startX:event.clientX,
			startY:event.clientY,
			label:label,
			blockFocus:deepcopy(focusData.value.focus) 
		}
		bus.emit('start')
		document.addEventListener("mousemove",mouseMove)
		document.addEventListener("mouseup",mouseUp)
	}
	// 鼠标移动
	const mouseMove = (e:any)=>{
		let {clientX,clientY} = e
		let moveX = clientX - state.startX  //移动x距离
		let moveY = clientY - state.startY //移动Y距离
		focusData.value.focus.forEach((res:any,index:number)=>{
			let {top:blockTop,height:blockHeight,left:blockLeft,width:blockWidth} = state.blockFocus[index]
			if(state.label === "顶"){
				if(moveY > 0){
					// 向下
					if(blockHeight - moveY <= 5) return;
					res.top = blockTop + Math.abs(moveY)
					res.height = blockHeight - moveY>5?blockHeight - moveY:5
				}else{
					// 向上
					res.top = blockTop + moveY
					res.height = blockHeight + Math.abs(moveY)
				}
			}else if(state.label === "底"){
				if(moveY > 0){
					// 向下
					res.height = blockHeight + Math.abs(moveY)
				}else{
					// 向上
					res.height = blockHeight - Math.abs(moveY)>5?blockHeight - Math.abs(moveY):5
				}
			}else if(state.label === "左"){
				if(moveX < 0){
					// 向左
					res.left = blockLeft - Math.abs(moveX)
					res.width = blockWidth + Math.abs(moveX)
				}else{
					// 向右
					if(blockWidth - moveX <= 5) return;
					res.left = blockLeft + Math.abs(moveX)
					res.width = blockWidth - Math.abs(moveX)
				}
			}else{
				if(moveX > 0){
					// 向左
					res.width = blockWidth + Math.abs(moveX)
				}else{
					// 向右
					if(blockWidth - Math.abs(moveX) <= 5) return;
					res.width = blockWidth - Math.abs(moveX)
				}
			}
				
		})
	}
	// 鼠标抬起
	const mouseUp = (e:any)=>{
		bus.emit('end')
		document.removeEventListener("mousemove",mouseMove)
		document.removeEventListener("mouseup",mouseUp)
	}
	
	bus.on("drawDown",mouseDown)
	onUnmounted(()=>{
		bus.off("drawDown",mouseDown)
		document.removeEventListener("mousemove",mouseMove)
		document.removeEventListener("mouseup",mouseUp)
	})
	return;
}