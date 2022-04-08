
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
		
		let blockRef = ref<any>(null)
		//外部基本样式
		const externalStyle:Ref<any> = computed(()=>({
			position:'absolute',
			left:`${props.blocks.left}px`,
			top:`${props.blocks.top}px`,
			zIndex:`${props.blocks.zIndex}px`,
			fontSize:props.blocks.key==="img"?0:''
		}))
		// 内部基本样式
		const insideStyle:Ref<any> = computed(()=>({
			display:`${props.blocks.display}px`,
			width:`${props.blocks.key!=="img"?props.blocks.width:props.blocks.width?props.blocks.width:50}px`,
			height:`${props.blocks.key!=="img"?props.blocks.height:props.blocks.height?props.blocks.height:50}px`,
			color:`${props.blocks.color}`,
			fontSize:`${props.blocks.fontSize}px`,
			padding:`${props.blocks.padding}px`,
			background:`${props.blocks.background}`,
			borderWidth:`${props.blocks.borderWidth}px`,
			borderColor:`${props.blocks.borderColor}`,
			borderType:`${props.blocks.borderType}`,
			borderRadius:`${props.blocks.borderRadius}px`,
			textAlign:`${props.blocks.textAlign}`,
			lineHeight:`${props.blocks.lineHeight}px`,
			boxShadow:`${props.blocks.boxShadow}`,
			fontFamily:`${props.blocks.fontFamily}`,
			fontWeight:`${props.blocks.fontWeight}`,
			
		}))
		// 标签属性
		props.blocks.class = 'webTeam' + new Date().getTime()
		const attbutes:Ref<any> = computed(()=>({
			className:`${props.blocks.class?props.blocks.class:""}`,
			text:`${props.blocks.text?props.blocks.text:""}`,
			title:`${props.blocks.title?props.blocks.title:""}`,
			placeholder:`${props.blocks.placeholder?props.blocks.placeholder:""}`,
			type:`${props.blocks.type?props.blocks.type:""}`,
			src:`${props.blocks.src?props.blocks.src:""}`,
			alt:`${props.blocks.alt?props.blocks.alt:""}`,
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
			 let componentBlock = componentMain.render(insideStyle.value,attbutes.value)
			 return <div ref={blockRef}  title={attbutes.value.title}  class={attbutes.value.className+' block'}  style={externalStyle.value}>
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