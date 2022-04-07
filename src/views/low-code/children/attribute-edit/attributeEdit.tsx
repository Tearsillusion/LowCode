import { defineComponent,computed,Ref,inject,onUnmounted} from 'vue'
import './attributeEdit.scss'
import bus from '../../../../public/bus'
import {attribute} from '../../main/attribute'
export default defineComponent({
	props:{
		blocks:{type:Object as any},
		canvas:{type:Object as any}
	},
	setup(props,{emit}){
		
		// 按下Enter键
		const onKeypress = (e:any,key:string,type:number)=>{
			if(e.which === 13){
				if(type === 1){
					props.canvas[key] = e.target.value
					return;
				}
				props.blocks[key] = Number(e.target.value)?Number(e.target.value):e.target.value;
			}
		}
		// 失去焦点
		const onBlur = (e:any,key:string,type:number)=>{
			if(type === 1){
				props.canvas[key] = e.target.value
				return;
			}
			props.blocks[key] = Number(e.target.value)?Number(e.target.value):e.target.value
			
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
		return ()=>{
			let {state} = attribute(props.blocks)
			let attributeData = state.attributes[props.blocks.key].attribute
			let attributeCode = [] as any[]
			
			attributeData.map((res:any)=>{
				for(let k in res.children){
					for(let m in props.blocks){
						if(m === k){
							res.children[k] = props.blocks[m]
						}
					}
				}
			})
			
			return <div class="attribute-edit">
					<div class="attribute-edit-content">
						<h2>画布大小</h2>
						{
							Object.keys(props.canvas).map((item)=>{
								return(
									<div class="attribute-edit-content-list">
										<span>{item}:</span>
										<input onFocus={onFocus} onBlur={(e:any)=>{onBlur(e,item,1)}} onKeypress={(e:any)=>{onKeypress(e,item,1)}} value={props.canvas[item]} />
									</div>
								)
							})
						}
					</div>
					{
						attributeData.map((res:any)=>{
							return (
								<div class="attribute-edit-content">
									<h2>{res.name}</h2>
									{
										Object.keys(res.children).map((item)=>{
											return(
												<div class="attribute-edit-content-list">
													<span>{item}:</span>
													{item!='src'?<input onFocus={onFocus} onBlur={(e:any)=>{onBlur(e,item,0)}} onKeypress={(e:any)=>{onKeypress(e,item,0)}} value={res.children[item]} />
													:<input type='file' onChange={(e:any)=>{onChange(e,item,0)}} />
													} 
												</div>
											)
										})
									}
								</div>
							)
						})
					}
				   </div>
		}
	}
})