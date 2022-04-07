
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
	render:(styleValue:any,attbutes:any)=><div style={styleValue}>{attbutes.text?attbutes.text:'预览文本'}</div>,
	key:'text',
})
// button
registerConfig.register({
	label:'按钮',
	originally:()=><button style="width:90%">预览按钮</button>,
	render:(styleValue:any,attbutes:any)=><button   style={styleValue}>{attbutes.text?attbutes.text:'渲染按钮'}</button>,
	key:'button',
})
// img
registerConfig.register({
	label:'图片',
	originally:()=><img src={require('../../../assets/icon-defalut.png')} style="width:60%">预览图片</img>,
	render:(styleValue:any,attbutes:any)=><img src={attbutes.src?attbutes.src:require('../../../assets/icon-defalut.png')} alt={attbutes.alt}   style={styleValue}>{attbutes.text?attbutes.text:'渲染按钮'}</img>,
	key:'img',
})
// input
registerConfig.register({
	label:'输入框',
	originally:()=><input style="width:90%">预览按钮</input>,
	render:(styleValue:any,attbutes:any)=><input type={attbutes.type}   placeholder={attbutes.placeholder?attbutes.placeholder:''} value={attbutes.text?attbutes.text:''} style={styleValue}></input>,
	key:'input',
})
// del
registerConfig.register({
	label:'删除线',
	originally:()=><del style="width:90%">预览del</del>,
	render:(styleValue:any,attbutes:any)=><del style={styleValue}>{attbutes.text?attbutes.text:'渲染del'}</del>,
	key:'del',
})