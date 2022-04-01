import HTTP from './axios'
import { Ref } from 'vue'
// 登录
export  function HttpLogin(params: object){
	return HTTP.POST('front/login/',params)
}
// 退出登录
export  function HttpLogout(params?: object){
	return HTTP.POST('front/logout/',params)
}
// 发送邮箱
export  function HttpNodeEmail(params?: object){
	return HTTP.POST('/node_email',params)
}