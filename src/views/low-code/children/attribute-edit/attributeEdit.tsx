import { defineComponent,computed,Ref,inject} from 'vue'
import './attributeEdit.scss'
import bus from '../../../../public/bus'
import {attribute} from '../../main/attribute'
export default defineComponent({
	props:{
		blocks:{type:Object as any}
	},
	setup(props,{emit}){
		
		
		return ()=>{
			let {state} = attribute(props.blocks)
			console.log(state.attributes[props.blocks.key])
			let attributeData = state.attributes[props.blocks.key].attribute
			let attributeCode = [] as any[]
			
			
				
			
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
													<input value={res.children[item]} />
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