
import { defineComponent,computed,Ref,inject} from 'vue'
import './dragBlock.scss'
import bus from '../../../../public/bus'
export default defineComponent({
	props:{
		blocks:{type:String}
	},
	setup(props,{emit}){
		let mapping:any = inject('mapping')
		let blocksParse = JSON.parse(props.blocks as any)
		console.log(blocksParse)
		const blockStyle:Ref<any> = computed(()=>({
			left:`${blocksParse.left}px`,
			top:`${blocksParse.top}px`,
			zIndex:`${blocksParse.zIndex}px`,
		}))
		
		function dragstart(e:any,res:any){
			bus.emit("dragStartEmit",res)
		}
		const dragend = ()=>{
			bus.emit("dragendEmit")
		}
		
		return(props:any)=>{
			 let componentMain = mapping.componentMap[blocksParse.key]
			 let componentBlock = componentMain.originally()
			 let text = componentMain.label
			 return <div onDragend={dragend} onDragstart={(e)=>{dragstart(e,blocksParse)}} draggable="true" class="drag-block" style={blockStyle.value}>
						<span class="drag-block-tip">{text}</span>
						{componentBlock}
				   </div>
			
		}
	}
})