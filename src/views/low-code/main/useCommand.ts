import bus from '../../../public/bus'
import deepcopy from 'deepcopy';
import {onUnmounted} from 'vue'
import { ElMessage } from 'element-plus'
export function useCommand(data:any){
	const state = {
		currentIndex:-1 as number,//存放指针
		commandList:{} as any,//存放命令的集合
		commandArray:[] as any[],//存放所有命令方法
		destroy:[] as any[],//销毁事件
		queue:[] as any[],//存放队列
	}
	
	const register = (command:any)=>{
		state.commandArray.push(command)
		state.commandList[command.name] = ()=>{
			let {redo,undo} = command.execute()
			redo()
			
			if(!command.queue){
				
				return
			}
			let {currentIndex,queue} = state
			if(state.queue.length>0){
				queue = queue.slice(0,currentIndex +1)
				state.queue = queue
			}
			state.queue.push({redo,undo})
			state.currentIndex = currentIndex + 1
		}
		
	}
	// 撤销
	register({
		name:'undo',
		keyboard:'ctrl+z',
		execute:()=>{
			return {
				redo(){
					
					if(state.currentIndex <= -1){
						ElMessage({
						    message: '已经没有可撤销的了',
						    type: 'warning',
						})
						return;
					} 
					state.queue[state.currentIndex].undo()
					state.currentIndex--
					
				}
			}
		}
	})
	// 前进
	register({
		name:'redo',
		keyboard:'ctrl+y',
		execute:()=>{
			return {
				redo(){
					
					if(state.currentIndex === state.queue.length - 1) {
						ElMessage({
						    message: '已经没有可还原的了',
						    type: 'warning',
						})
						
						return
					}
					if(state.currentIndex==-1){
						state.currentIndex = 0
					}
					state.queue[state.currentIndex].redo()
					state.currentIndex++
					
				}
			}
		}
	})
	
	register({
		name:'drag',
		queue:true,
		init(this:any){
			this.before = null
			
			const start = ()=> this.before = deepcopy(data.value.blocks)
			const end = ()=> state.commandList.drag()
			bus.on('start',start)
			bus.on('end',end)
			return ()=>{
				bus.off('start',start)
				bus.off('end',end)
			}
			
		},
		execute(this:any){
			let before = this.before
			let after = deepcopy(data.value.blocks)
			return {
				// 前进
				redo(){
					data.value = {...data.value,blocks:after}
				},
				// 撤销
				undo(){
					data.value = {...data.value,blocks:before}
				}
			}
		}
	});
	(()=>{
		state.commandArray.forEach((command)=>state.destroy.push(command.queue?command.init&&command.init():''))
	})()
	onUnmounted(()=>{
		state.destroy.forEach((fn)=>fn&&fn())
	})
	return{
		state
	}
}