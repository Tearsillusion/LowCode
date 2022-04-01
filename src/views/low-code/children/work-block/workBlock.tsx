
import { defineComponent,computed,Ref,inject,ref,onMounted } from 'vue'
import './workBlock.scss'
import deepcopy from 'deepcopy';
import bus from '../../../../public/bus'
export default defineComponent({
	props:{
		blocks:{type:Object as any},
		focus:{type:Object as any}
	},
	setup(props){
		console.log(props)
		let blockRef = ref<any>(null)
		
		const blockStyle:Ref<any> = computed(()=>({
			left:`${props.blocks.left}px`,
			top:`${props.blocks.top}px`,
			zIndex:`${props.blocks.zIndex}px`,
			width:`${props.blocks.width}px`,
			height:`${props.blocks.height}px`,
		}))
		
		
		
		let mapping:any = inject('mapping')
		
		
		onMounted(()=>{
			
			let {offsetWidth,offsetHeight} =  blockRef.value
			
			if(props.blocks.aliginCenter){
				props.blocks.left = props.blocks.left - offsetWidth/2
				props.blocks.top = props.blocks.top - offsetHeight/2
			}
			props.blocks.aliginCenter = false
			props.blocks.width = offsetWidth
			props.blocks.height = offsetHeight
			
		})
		let drawPos = {
			startX:0 as number,
			startY:0 as number,
			label:"" as string,
			width:0 as number,
			height:0 as number,
			left:0 as number,
			top:0 as number,
		}
		const drawMain = (e:any,text:string)=>{
			e.preventDefault()
			e.stopPropagation()
			bus.emit("drawDown",{
				'event':e,
				'label':text
			})
		}
		let drawList = [
			{label:'顶',render:(e:any)=>{ drawMain(e,'顶') }},
			{label:'左',render:(e:any)=>{drawMain(e,'左')}},
			{label:'底',render:(e:any)=>{drawMain(e,'底')}},
			{label:'右',render:(e:any)=>{drawMain(e,'右')}},
		] as any
		
		return(props:any)=>{
			 let componentMain = mapping.componentMap[props.blocks.key]
			 let componentBlock = componentMain.render({
				 width:blockStyle.value.width,
				 height:blockStyle.value.height
			 })
			 console.log(1111)
			 return <div ref={blockRef} class="block" style={blockStyle.value}>
					{componentBlock}
					
					{
						drawList.map((res:any)=>{
							return (
								props.blocks.focus?<i 
								onMousedown={(e:any)=>{res.render(e)}}
								></i>:''
							)
						})
					}
				   </div>
			
		}
	}
})