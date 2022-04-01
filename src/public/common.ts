// 图表文字自适应
const FontSize:any  =  (res:number) => {
	let clientWidth:number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (!clientWidth) return;
	if(clientWidth<1200){
		clientWidth = 1200
	}
	let fontSize = res/(75/(clientWidth/18))
	return fontSize	
}
// 设置 rem 函数
function setRem () {

    // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//得到html的Dom元素
    let htmlDom = document.getElementsByTagName('html')[0];
//设置根元素字体大小
    htmlDom.style.fontSize= htmlWidth/10 + 'px';
}
function ArrayDim (dimension: number, initial: number){
	var a = [],i;
	for(i=0;i < dimension; i++){
		a[i] = initial;
	}
	return a;
};
export {FontSize, ArrayDim, setRem}