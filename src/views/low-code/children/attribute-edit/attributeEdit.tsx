import { defineComponent,computed,Ref,inject} from 'vue'
import './attributeEdit.scss'
import bus from '../../../../public/bus'
import {attribute} from '../../main/attribute'
export default defineComponent({
	props:{
		blocks:{type:Object as any}
	},
	setup(props,{emit}){
		
		const onKeypress = (e:any,key:string)=>{
			props.blocks[key] = Number(e.target.value)?Number(e.target.value):e.target.value
		}
		
		
		
		return ()=>{
			let {state} = attribute(props.blocks)
			console.log(state.attributes[props.blocks.key])
			let attributeData = state.attributes[props.blocks.key].attribute
			let attributeCode = [] as any[]
			console.log(attributeData)
			attributeData.map((res:any)=>{
				for(let k in res.children){
					for(let m in props.blocks){
						if(m === k){
							res.children[k] = props.blocks[m]
						}
					}
				}
			})
			console.log(attributeData)
				
			
			return <div class="attribute-edit">
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
													<input onKeypress={(e:any)=>{onKeypress(e,item)}} value={res.children[item]} />
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