import deepcopy from 'deepcopy';
import bus from '../../../public/bus'
import {onUnmounted} from 'vue'
export function useCopy(selectBlock:any,data:any,callback:any){
	
	let saveSelectBlock = null as any
	
	let onkeydown = (e:any)=>{
		console.log(e)
		// ctrl + c
		if(e.ctrlKey && e.which === 67){
			if(selectBlock.value){
				saveSelectBlock = deepcopy(selectBlock.value)
				bus.emit('start')
			}
		}
		// ctrl + v
		if(e.ctrlKey && e.which === 86){
			if(saveSelectBlock){
				data.value.blocks.push(saveSelectBlock)
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