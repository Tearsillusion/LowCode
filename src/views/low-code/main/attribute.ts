export function attribute(block:any){
	let state = {
		attributes:{} as any
	}
	
	const register=(attribute:any)=>{
		state.attributes[attribute.key] = attribute
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
			children:{
				left:'',
				top:'',
				width:'',
				height:'',
				color:'',
				fontSize:''
			}
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
			children:{
				left:'',
				top:'',
				width:'',
				height:'',
				color:'',
				fontSize:''
			}
		}],
		
	})
	register({
		key:'input',
		attribute:[{
			name:'标签参数',
			children:{
				class:'',
				title:'',
				value:'',
				placeholder:''
			}
		},{
			name:'基本属性',
			children:{
				left:'',
				top:'',
				width:'',
				height:'',
				color:'',
				fontSize:''
			}
		}],
		
	})
	
	
	
	return {state}
}