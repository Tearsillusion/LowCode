import deepcopy from 'deepcopy';
import bus from '../../../public/bus'
import {onUnmounted} from 'vue'
export function useCopy(focusComputed:any,data:any,callback:any){
	
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
	document.addEventListener("keydown", onkeydown)
	onUnmounted(()=>{
		document.removeEventListener("keydown", onkeydown)
	})
	return;
}