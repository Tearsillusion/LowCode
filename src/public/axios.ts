import axios from "axios";
import qs from "qs";
import { ElMessage, ElLoading } from 'element-plus'
import { getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import store from '../store'

let loading:any;
axios.defaults.baseURL = 'http://192.168.2.44:3000'  //正式
// axios.defaults.baseURL = 'http://test' //测试

//post请求头
axios.defaults.headers.post["Content-Type"] ="application/x-www-form-urlencoded;charset=UTF-8";
//设置超时
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  config => {
	if(store.state.loadingX){
		loading = ElLoading.service({
		  lock: true,
		  text: 'Loading',
		  background: 'rgba(0, 0, 0, 0.7)',
		})
	}
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
	  if(store.state.loadingX){
		  loading.close()
		  store.commit("loadingMainX", true)
	  }
	  if(response){
	  	if (response.data === null && response.config.responseType === 'json' && response.request.responseText != null) {
	  	  try {
	  		// eslint-disable-next-line no-param-reassign
	  		response.data = JSON.parse(response.request.responseText);
	  	  } catch (e) {
	  		// ignored
	  	  }
	  	  return response
	  	}
	  	if(response.headers['content-type']==="application/ms-excel"){
	  		return response
	  	}else{
	  		if(response.data&&response.data.code!==200){
	  			if(response.data.message){
	  				ElMessage({
	  				    message: response.data.message,
	  				    type: 'warning',
	  				  })
	  			}
				
	  			if(response.data.code === 401){
	  				store.commit('quitMainX',401)
	  			}
	  		}
	  		return response.data
	  	}
	  }
	  
  },
  error => {
	if(store.state.loadingX){
		loading.close()
		store.commit("loadingMainX", true)
	}
	
  	if (error && error.response) {
  		error.message = ""
  	  // 1.公共错误处理
  	  // 2.根据响应码具体处理
  	  switch (error.response.status) {
  	    case 400:
  	      error.message = "错误请求";
  	      break;
  	    case 401:
  	      error.message = "未授权，请重新登录";
		  store.commit('quitMainX',401)
  	      break;
  	    case 403:
  	      error.message = "拒绝访问";
  	      break;
  	    case 404:
  	      error.message = "请求错误,未找到该资源";
  	      break;
  	    case 405:
  	      error.message = "请求方法未允许";
  	      break;
  	    case 408:
  	      error.message = "请求超时";
  	      break;
  	    case 500:
  	      error.message = "服务器端出错";
  	      break;
  	    case 501:
  	      error.message = "网络未实现";
  	      break;
  	    case 502:
  	      error.message = "网络错误";
  	      break;
  	    case 503:
  	      error.message = "服务不可用";
  	      break;
  	    case 504:
  	      error.message = "网络超时";
  	      break;
  	    case 505:
  	      error.message = "http版本不支持该请求";
  	      break;
  	    default:
  	      error.message = `连接错误${error.response.status}`;
  	  }
  	} else {
  	  // 超时处理
  	  // if (JSON.stringify(error).includes("timeout")) {
		   // ElMessage.error('服务器响应超时，请刷新当前页')
  	  // }
  	  error.message = "连接服务器失败";
  	}
  	ElMessage.error(error.message)
	return Promise.reject(error);
  }
)
type HTTPTYPE = {
 POST:any,
 GET:any,
 FILE:any,
}
let HTTP: HTTPTYPE = {
	POST:null,
	GET:null,
	FILE:null,
}
 HTTP.POST = (url: string, data: any) => {
	 
    return new Promise((resolve, reject) => {
      axios({
          method: 'post',
          url,
          data: qs.stringify(data,{ indices: false }),
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        });
    })
  },

 HTTP.GET = (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      axios({
          method: 'get',
          url,
          params: data,
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  HTTP.FILE = function(url: string, data: any){
  	return new Promise((resolve,reject)=>{
  		axios({
  			method: 'POST',
  			url,
  			data:qs.stringify(data,{ indices: false }),
  			responseType: 'blob'
  		}).then(res => {
  			if(res){
  				if(res.status==200){
  					let fileName = res.headers['content-disposition'].split(';')[1].split("=utf-8''")[1].replace(/\"/g, '');
  					let blob = new Blob([res.data]);
  					const url = window.URL.createObjectURL(blob);
  					let link = document.createElement('a');
  					link.style.display = 'none';
  					link.href = url;
  					link.setAttribute('download', decodeURI(fileName));
  					document.body.appendChild(link);
  					link.click();
  					resolve(res)
  				}
  			}
  		})
  	})
  }
export default HTTP
	 
