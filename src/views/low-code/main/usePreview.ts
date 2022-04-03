import {nextTick} from 'vue'
export function usePreview(previewShow:any,workCanvasRef:any,workPreviewRef:any){
	
	const previewClick = async ()=>{
		previewShow.value = true
		let workpreview = workCanvasRef.value.cloneNode(true)
		await nextTick()
		workPreviewRef.value&&workPreviewRef.value.appendChild(workpreview);
	}
	// 隐藏预览
	const previewModelClick = ()=>{
		previewShow.value = false
	}
	return{
		previewClick,previewModelClick
	}
}