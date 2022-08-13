import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//导入创建的请求对象
import request from './httpapi/api.js'
//将请求对象绑定到vue的原型上
Vue.prototype.$request = request

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
