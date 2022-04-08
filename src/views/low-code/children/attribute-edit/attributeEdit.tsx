import { defineComponent,computed,Ref,inject,onUnmounted} from 'vue'
import './attributeEdit.scss'
import bus from '../../../../public/bus'
import {attribute} from '../../main/attribute'
import {useSeachReply} from '../../main/useSeachReply'
export default defineComponent({
	props:{
		blocks:{type:Object as any},
		canvas:{type:Object as any}
	},
	setup(props,{emit}){
		// 按下Enter键,失去焦点,查重class
		let {onKeypress,onChange,onFocus} = useSeachReply(props)
		
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
										<input onFocus={onFocus} onBlur={(e:any)=>{onKeypress(e,item,1)}} onKeypress={(e:any)=>{onKeypress(e,item,1)}} value={props.canvas[item]} />
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
													{item!='src'?<input onFocus={onFocus} onBlur={(e:any)=>{onKeypress(e,item,0)}} onKeypress={(e:any)=>{onKeypress(e,item,0)}} value={res.children[item]} />
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