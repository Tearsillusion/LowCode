
function createdConfig(){
	
	let componentArray = [] as any[] //全部组件
	let componentMap = {} as any
	
	const register = (component:any)=>{
		componentArray.push(component)
		componentMap[component.key] = component
	}
	
	return {
		componentArray,
		componentMap,
		register
		
	}
}
export let registerConfig =  createdConfig()

// 文本
registerConfig.register({
	label:'文本',
	originally:()=>'预览文本',
	render:()=>'渲染文本',
	key:'text',
})
// button
registerConfig.register({
	label:'按钮',
	originally:()=><button style="width:90%">预览按钮</button>,
	render:(styleValue:any)=><button style={styleValue}>渲染按钮</button>,
	key:'button',
})
// input
registerConfig.register({
	label:'输入框',
	originally:()=><input style="width:90%">预览按钮</input>,
	render:(styleValue:any)=><input style={styleValue}>渲染按钮</input>,
	key:'input',
})