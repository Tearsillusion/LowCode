export function attribute(block:any){
	let state = {
		attributes:{} as any
	}
	
	const register=(attribute:any)=>{
		state.attributes[attribute.key] = attribute
	}
	
	let baseStyle = {
		left:'',
		top:'',
		width:'',
		height:'',
		color:'',
		fontSize:'',
		padding:'',
		background:'',
		borderWidth:'',
		borderColor:'',
		borderType:'',
		borderRadius:'',
		textAlign:'',
		lineHeight:'',
		boxShadow:'',
		fontWeight:'',
		fontFamily:'',
		display:'block'
	}
	
	register({
		key:'text',
		attribute:[{
			name:'标签参数',
			children:{
				class:'',
				title:'',
				text:''
			}
		},{
			name:'基本属性',
			children:baseStyle
		}],
	})
	register({  
		key:'button',
		attribute:[{
			name:'标签参数',
			children:{
				class:'',
				title:'',
				text:''
			}
		},{
			name:'基本属性',
			children:baseStyle
		}],
		
	})
	register({
		key:'img',
		attribute:[{
			name:'标签参数',
			children:{
				class:'',
				title:'',
				src:'',
				alt:''
			}
		},{
			name:'基本属性',
			children:baseStyle
		}],
		
	})
	register({
		key:'input',
		attribute:[{
			name:'标签参数',
			children:{
				class:'',
				title:'',
				text:'',
				placeholder:'',
				type:''
			}
		},{
			name:'基本属性',
			children:baseStyle
		}],
		
	})
	register({
		key:'del',
		attribute:[{
			name:'标签参数',
			children:{
				class:'',
				title:'',
				text:'',
			}
		},{
			name:'基本属性',
			children:baseStyle
		}],
		
	})
	
	
	return {state}
}