import { createStore } from "vuex";
import router from '../router'
import { ElMessage } from 'element-plus'
import { HttpLogout } from '../public/http'
export default createStore({
  state: {
	 
	  
	  loadingX:true as boolean,
	 
  },
  getters: {},
  mutations: {
	
	  // 是否使用全局加载框
	  loadingMainX(state,value){
		  state.loadingX = value
	  },
	  
  },
  actions: {},
  modules: {},
});
