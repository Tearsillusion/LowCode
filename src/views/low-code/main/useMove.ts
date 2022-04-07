import {reactive,onUnmounted} from 'vue'
import bus from '../../../public/bus'
export function useMove(focusComputed:any,selectBlock:any,data:any){
	
	let startPos = {
		startX:0 as number,
		startY:0 as number,
		startPosList:[] as any[],
		selectLeft:0 as number,
		selectTop:0 as number,
		lines:null as any,
		
	}
	let lineTip = reactive({
		x:null as null|number,
		y:null as null|number
	})
	const mousemoveMain = function(e:any){
		let {clientX:moveX,clientY:moveY} = e
		
		let l = moveX - startPos.startX + startPos.selectLeft
		let t = moveY - startPos.startY + startPos.selectTop
		let x = null as number|null
		let y = null as number|null
		
		for(let i=0;i<startPos.lines.y.length-1;i++){
			 let {showLineX,showBlockX} = startPos.lines.y[i]
			 if(Math.abs(l - showBlockX) < 5){
				 x = startPos.lines.y[i].showLineX //计算辅助线显示的位置
				 moveX = startPos.startX - startPos.selectLeft + showBlockX //贴边效果
				 break
			 }
		}
		for(let i=0;i<startPos.lines.x.length-1;i++){
			 let {showLineY,showBlockY} = startPos.lines.x[i]
			 if(Math.abs(t - showBlockY) < 5){
				 y = startPos.lines.x[i].showLineY //计算辅助线显示的位置
				 moveY = startPos.startY - startPos.selectTop + showBlockY //贴边效果
				 break
			 }
		}
		lineTip.x = y
		lineTip.y = x
		
		 let currentX = moveX - startPos.startX
		 let currentY = moveY - startPos.startY
		 focusComputed.value.focus.forEach((val: any,index: number)=>{
			 val.left = startPos.startPosList[index].left + currentX
			 val.top = startPos.startPosList[index].top + currentY
		 })
		 
		 
	}
	const mouseupMain = function(e:any){
		bus.emit('end')
		document.removeEventListener('mousemove',mousemoveMain)
		document.removeEventListener('mouseup',mouseupMain)
	}
	
	
	const mousedownMain = function(e:any){
		
		let {left:selectX,top:selectY,width:selectW,height:selectH} = selectBlock.value
		startPos = {
			startX:e.clientX,
			startY:e.clientY,
			selectLeft:selectX,
			selectTop:selectY,
			startPosList:focusComputed.value.focus.map((block:any)=>({left:block.left,top:block.top})),
			lines:(()=>{
				let lines = {x:[] as any,y:[] as any}
				// lines.x:横线 lines.y:竖线 showLineY:横线距离顶部的位置 showBlockY选中块距离顶多远显示辅助线
				// 方法:顶对顶,底对顶,中间对中间,底对底,顶对底
				let x = [...focusComputed.value.unFocus,{
					left:0,
					top:0,
					width:data.value.content.width,
					height:data.value.content.height,
				}].forEach((res:any)=>{
					lines.x.push({showLineY:res.top,showBlockY:res.top})
					lines.x.push({showLineY:res.top,showBlockY:res.top - selectH})
					lines.x.push({showLineY:res.top + res.height/2,showBlockY:res.top + res.height/2 - selectH/2})
					lines.x.push({showLineY:res.top + res.height,showBlockY:res.top + res.height - selectH})
					lines.x.push({showLineY:res.top + res.height,showBlockY:res.top + res.height})
					
					lines.y.push({showLineX:res.left,showBlockX:res.left})
					lines.y.push({showLineX:res.left,showBlockX:res.left - selectW})
					lines.y.push({showLineX:res.left + res.width/2,showBlockX:res.left + res.width/2 - selectW/2})
					lines.y.push({showLineX:res.left + res.width,showBlockX:res.left + res.width - selectW})
					lines.y.push({showLineX:res.left + res.width,showBlockX:res.left + res.width})
				})
				
				return lines
			})()
		}
		bus.emit('start')
		document.addEventListener('mousemove',mousemoveMain)
		document.addEventListener('mouseup',mouseupMain)
	}
	const removeLineTip = ()=>{
		lineTip.x = null
		lineTip.y = null
	}
	
	bus.on("removeLineTip",removeLineTip)
	
	onUnmounted(()=>{
		bus.on("removeLineTip",removeLineTip)
	})
	return{
		mousedownMain,
		lineTip
	}
}