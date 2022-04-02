import {computed,defineComponent,ref,Ref,inject} from 'vue' 
import './lowCodeEdit.scss'
import bus from '../../public/bus'
import workBlock from './children/work-block/workBlock'
import dragBlock from './children/drag-block/dragBlock'
import attributeEdit from './children/attribute-edit/attributeEdit'

import deepcopy from 'deepcopy';
import {useMenuDrag} from './main/useMenuDrag'
import {useFocus} from './main/useFocus'
import {useMove} from './main/useMove'
import {useCommand} from './main/useCommand'
import {useDraw} from './main/useDraw'
import {useCopy} from './main/useCopy'
export default defineComponent({
	components:{
		workBlock,
		dragBlock,
		attributeEdit
	},
	props:{
		modelValue:{type:Object}
	},
	setup(props,ctx){
		let workCanvasRef = ref<any>(null)
		let workCanvas = null as any
		let data: Ref<any> = computed({
			get(){
				return  props.modelValue
			},
			set(newValue){
				ctx.emit("onUpdate", newValue)
			}
		})
		
		const canvasStyle = computed(()=>({
				width:data.value.content.width+'px',
				height:data.value.content.height+'px'
			}))
		
		let mapping:any = inject('mapping')
		
		// 实现菜单的拖拽
		let {dragenter,drop} = useMenuDrag(workCanvasRef,data)
		// 实现获取焦点
		let {blockMousedown,workMousedown,focusComputed,selectBlock} = useFocus(data,(e:any)=>{
			mousedownMain(e)
		})
		// 实现移动和辅助线功能
		let {mousedownMain,lineTip}  = useMove(focusComputed,selectBlock,data)
		// 实现撤销功能
		let { state } = useCommand(data)
		// 实现拖拽放大缩小功能
		useDraw(focusComputed,data)
		// 实现快捷键复制和撤销功能
		useCopy(selectBlock,data,(val:number)=>{
			if(val === 1){
				state.commandList.undo()
			}else{
				state.commandList.redo()
			}
		})
		// 撤销,还原
		let buttonList = [
			{label:'撤销',keyBoard:'ctrl+z',render:()=>{state.commandList.undo()}},
			{label:'还原',keyBoard:'ctrl+q',render:()=>{state.commandList.redo()}},
		] as any[]
		// 接受拖拽开始的数据
		return ()=> <div class="low-code-container">
						<div class="low-code-container-top">
							<div class="low-code-container-top-left">
								{
									buttonList.map((res:any)=>{
										
										return (
											<button title={res.keyBoard} class="hoverActive" onClick={res.render}>{res.label}</button>
										)
										
									})
								}
							</div>
							<div class="low-code-container-top-center">
								
							</div>
							<div class="low-code-container-top-right"></div>
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
										
									</div>
								</div>
								{lineTip.x!==null?<div class="line-x" style={{top:lineTip.x+'px'}}></div>:''}
								{lineTip.y!==null?<div class="line-y" style={{left:lineTip.y+'px'}}></div>:''}
							</div>
							{/*属性区*/}
							<div class="low-code-container-bottom-attribute">
							{
								[(selectBlock.value?selectBlock.value:data.value.blocks[0])].map((block:any,index:number)=>{
									return (
										 <attributeEdit
											blocks={block}
										 ></attributeEdit>
									)
								})
							}
								
							</div>
						</div>
					</div>
	}
	
	
})