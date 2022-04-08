import { ElMessage } from 'element-plus'
import deepcopy from 'deepcopy';
import {onUnmounted} from 'vue'
import bus from '../../../public/bus'
export function useSeachReply(props:any){
	// 查询是否class重复
	const seachReply = (name:string)=>{
		let canvasChildren:any = document.getElementsByClassName('low-code-container-bottom-work-canvas')[0]
		let result = null
		if(canvasChildren&&canvasChildren.childNodes.length!==0){
			for(let i=0;i<canvasChildren.childNodes.length;i++){
				if(canvasChildren.childNodes[i].className){
					let className = canvasChildren.childNodes[i].className.split(" ")[0]
					if(className === name){
						result = false
						break;
					}
				}
				if(i === canvasChildren.childNodes.length - 1){
					result = true
				}
			}
		}
		return result
	}
	
	// 按下Enter键
	const onKeypress = (e:any,key:string,type:number)=>{
		if(e.which === 13){
			let oldValue =  deepcopy(props.blocks[key])
			if(oldValue !== e.target.value){
				if(key === 'class'){
					let result = seachReply(e.target.value)
					if(!result){
						e.target.value = oldValue
						ElMessage({
						    message: 'class名字不能重复！',
						    type: 'warning',
						})
						return;
					} 
				}
				if(type === 1){
					props.canvas[key] = e.target.value
					return;
				}
				props.blocks[key] = Number(e.target.value)?Number(e.target.value):e.target.value;
			}
		}
	}
	// 获取图片地址
	const onChange = (e:any,key:string,type:number)=>{
		  const fileReader = new FileReader()
		  fileReader.readAsDataURL(e.target.files[0])
		  fileReader.onload = function () {
			props.blocks[key] = this.result
		  }
	}
	let currentInput = null as any
	// 获取焦点
	const onFocus = (e:any)=>{
		currentInput = e.target
		bus.emit("removeKeypress",1)
	}
	// 移除焦点
	const removeFocus = (res:any)=>{
		if(currentInput&&res === 2){
			currentInput.blur()
		}
	}
	
	bus.on("removeKeypress", removeFocus)
	onUnmounted(()=>{
		bus.off("removeKeypress", removeFocus)
	})
	return{
		onKeypress,
		onChange,
		onFocus
	}
}