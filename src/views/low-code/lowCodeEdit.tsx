import {computed,defineComponent,ref,Ref,inject,nextTick,onUnmounted} from 'vue' 
import './lowCodeEdit.scss'
import bus from '../../public/bus'
import workBlock from './children/work-block/workBlock'
import dragBlock from './children/drag-block/dragBlock'
import attributeEdit from './children/attribute-edit/attributeEdit'
import 'element-plus/theme-chalk/index.css'
import { ElMessage,ElDialog,ElButton} from 'element-plus'

import deepcopy from 'deepcopy';
import {useMenuDrag} from './main/useMenuDrag'
import {useFocus} from './main/useFocus'
import {useMove} from './main/useMove'
import {useCommand} from './main/useCommand'
import {useDraw} from './main/useDraw'
import {useCopy} from './main/useCopy'
import {usePreview} from './main/usePreview'
import lowMenu from './children/low-menu/lowMenu.vue'
export default defineComponent({
	components:{
		workBlock,
		dragBlock,
		attributeEdit,
		lowMenu
	},
	props:{
		modelValue:{type:Object}
	},
	setup(props,ctx){
		let workCanvasRef = ref<any>(null)
		let workPreviewRef = ref<any>(null)
		let previewShow = ref<any>(false)
		let scaleValue = ref<any>(1)
		let scaleShow = ref<any>(false)
		let workCanvas = null as any
		let data: Ref<any> = computed({
			get(){
				return  props.modelValue
			},
			set(newValue){
				ctx.emit("onUpdate", newValue)
			}
		})
		
		const canvasStyle:Ref<any> = computed(()=>({
				position: 'relative',
				width:data.value.content.width+'px',
				height:data.value.content.height+'px',
				background:data.value.content.background
			}))
		
		let mapping:any = inject('mapping')
		let lineTipSave = null
		// 实现菜单的拖拽
		let {dragenter} = useMenuDrag(workCanvasRef,data)
		// 实现获取焦点
		let {blockMousedown,workMousedown,focusComputed,selectBlock} = useFocus(data,(e:any)=>{
			mousedownMain(e)
			bus.emit("removeKeypress",2)
		})
		// 实现移动和辅助线功能
		let {mousedownMain,lineTip}  = useMove(focusComputed,selectBlock,data)
		
		// 实现撤销功能
		let { state } = useCommand(data)
		// 实现拖拽放大缩小功能
		useDraw(focusComputed,data)
		// 预览
		let {previewClick,previewModelClick} = usePreview(previewShow,workCanvasRef,workPreviewRef)
		// 实现快捷键复制和撤销功能
		useCopy(focusComputed,data,workCanvasRef,scaleShow,scaleValue,(val:number)=>{
			if(val === 1){
				state.commandList.undo()
			}else if(val === 2){
				state.commandList.redo()
			}else if(val === 3){
				previewClick()
			}else if(val === 4){
				ctx.emit("onExport",workCanvasRef)
			}
		})
		
		// 导出
		// useExport()
		// 撤销,还原
		let buttonList = [
			{label:'撤销',keyBoard:'ctrl+z',render:()=>{state.commandList.undo()}},
			{label:'还原',keyBoard:'ctrl+q',render:()=>{state.commandList.redo()}},
			{label:'预览',keyBoard:'shift+r',render:()=>{previewClick()}},
			{label:'导出',keyBoard:'shift+e',render:()=>{ctx.emit("onExport",workCanvasRef)}},
		] as any[]
		// 接受拖拽开始的数据
		return ()=> {
			let previewCode = null
			if(previewShow.value){
				previewCode = (
					<div class="low-code-container-preview" ref={workPreviewRef}>
						<div onClick = {previewModelClick} class="low-code-container-preview-model"></div>
					</div>
				)
			}
			return<div class="low-code-container">
						{/*导出*/}
						
						{/*预览区*/}
						{previewCode}
						<div class="low-code-container-top">
							<div class="low-code-container-top-left">
								
							</div>
							<div class="low-code-container-top-center">
								{
									buttonList.map((res:any)=>{
										
										return (
											<button onMousedown = {workMousedown} title={res.keyBoard} class="hoverActive" onClick={res.render}>{res.label}</button>
										)
										
									})
								}
							</div>
							<div class="low-code-container-top-right">
								<lowMenu></lowMenu>
							</div>
						</div>
						<div class="low-code-container-bottom">
							{/*组件区*/}
							<div class="low-code-container-bottom-block">
								{
									mapping.componentArray.map((block:any)=>{
										return (
											<dragBlock blocks={JSON.stringify(block)}></dragBlock>
										)
									})
								}			
							</div>
							{/*工作区*/}
							<div class="low-code-container-bottom-work">
								{
									scaleShow.value?<div class="low-code-container-bottom-work-scale">当前缩放: {scaleValue.value}</div>:""
									
								}
								<div class="low-code-container-bottom-work-container">
									<div onMousedown = {workMousedown} ref={workCanvasRef}   style={canvasStyle.value}  class="low-code-container-bottom-work-canvas">
										{
											data.value.blocks.map((block:any,index:number)=>{
												if(block.show!==0){
													return (
														<workBlock
														 blocks={block}
														 focus={focusComputed}
														 class={block.focus?'block-focus':''}
														 onMousedown = {(e:any)=>{blockMousedown(e,block,index)}}
														 >
														 </workBlock> 
													)
												}
											})
										}
										{lineTip.x!==null?<div class="line-x" style={{top:lineTip.x+'px'}}></div>:''}
										{lineTip.y!==null?<div class="line-y" style={{left:lineTip.y+'px'}}></div>:''}
									</div>
								</div>
								
							</div>
							{/*属性区*/}
							<div class="low-code-container-bottom-attribute">
							{
								[(selectBlock.value?selectBlock.value:data.value.blocks[0])].map((block:any,index:number)=>{
									return (
										 <attributeEdit
											blocks={block}
											canvas={data.value.content}
										 ></attributeEdit>
									)
								})
							}
								
							</div>
						</div>
					</div>
			}
	}
	
	
})