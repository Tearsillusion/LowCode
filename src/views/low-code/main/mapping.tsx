
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
	render:(styleValue:any,attbutes:any)=><span style={styleValue}>{attbutes.text?attbutes.text:'预览文本'}</span>,
	key:'text',
})
// button
registerConfig.register({
	label:'按钮',
	originally:()=><button style="width:90%">预览按钮</button>,
	render:(styleValue:any,attbutes:any)=><button   style={styleValue}>{attbutes.text?attbutes.text:'渲染按钮'}</button>,
	key:'button',
})
// input
registerConfig.register({
	label:'输入框',
	originally:()=><input style="width:90%">预览按钮</input>,
	render:(styleValue:any,attbutes:any)=><input type={attbutes.type}   placeholder={attbutes.placeholder?attbutes.placeholder:''} value={attbutes.text?attbutes.text:''} style={styleValue}></input>,
	key:'input',
})