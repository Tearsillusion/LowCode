
export function useExport(exportType:any,exportDom:any,cssSplitValue:any,callback:any){
	
	
	// 计算style样式
	let styleCode = `.${exportDom.attributes.class.value}{${exportDom.attributes.style.value}}`
	let index = 0
	const styleSeach:any = (list:any,type:any)=>{
		for(let i=0;i<list.length -1;i++){
			if(!type) index++
			if(list[i].attributes){
				let className = ""
				let tag = ""
				if(list[i].attributes.class){
					className = list[i].attributes.class.value.split(" ")[0]
					styleCode += `.${className}{${list[i].attributes.style.value}}`
				}else{
					className =  list[i].parentNode.attributes.class.value.split(" ")[0]
					tag = list[i].attributes.style.ownerElement.localName
					styleCode += `.${className} ${tag}{${list[i].attributes.style.value}}`
				}
				
				if(list[i].childNodes){
					 styleSeach(list[i].childNodes,1)
				}
			}
			if(index === exportDom.childNodes.length -1){
				return styleCode
			}
		}
		
	}
	// 去除不必要的样式属性
	const removeNoNeed = (code:string)=>{
		code = cssSplitValue?code.replace(/\t|title=""| block|style="[^"]*"/g,''):code.replace(/\t|title=""| block/g,'')
		return code
	}
	
	let styleString = cssSplitValue?styleSeach(exportDom.childNodes):null
	let exportString = ""
	let exportCode = exportDom.outerHTML.replace(/<!---->|/ig,"")
	for(let char of exportCode){
		if(char === '>'){
			char = char+'\n'
		}
		exportString += char
	}
	if(exportType === 1){
		// 静态HTML
		let code = `
			<!DOCTYPE html>
			<html lang="">
			  <head>
			    <meta charset="utf-8">
			    <meta http-equiv="X-UA-Compatible" content="IE=edge">
			    <meta name="viewport" content="width=device-width,initial-scale=1.0">
			    <title></title>
				${styleString?'<style type="text/css">'+styleString+'</style>':''}
			  </head>
			  <body>
			   ${exportString}
			  </body>
			</html>
		`
		code = removeNoNeed(code)
		callback(code)
	}else if(exportType === 2){
		// vue
		let code = `
			<template>
				${exportString}
			</template>
			<script>
			</script>
			<style>
				${styleString}
			</style>
		`
		code = removeNoNeed(code)
		callback(code)
	}else if(exportType === 3){
		// react
		exportString = exportString.replace(/class/g,'className')
		let code = `
			// ----html----
			class WebTeam extends React.Component {
			    constructor(props) {
			        super(props);
			    }
			    render() {
			        return (
			           ${exportString}
			        );
			    }
			}
			// ----css----
			${styleString}
		`
		code = removeNoNeed(code)
		callback(code)
	}else if(exportType === 4){
		// 小程序
		exportString = exportString.replace(/div/g,'view')
		exportString = exportString.replace(/img/g,'image')
		let code = `
			// ----html----
			${exportString}
			// ----css----
			${styleString}
		`
		code = removeNoNeed(code)
		callback(code)
	}
	
}