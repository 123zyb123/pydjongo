import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/login',
		component: Login
	},
	{
		path: '/reg',
		component: () => import('../components/Reg.vue')
	},
	{
		path: '/',
		redirect: '/indexhome'
	},
	{
		path: '/indexhome',
		component: () => import('../components/Indexhome.vue'),
		redirect: '/Myinformation',
		children: [{
				path: '/Myinformation',
				component: () => import('../components/Myinformation.vue')
			},
			{
				path: '/Familyinformation',
				component: () => import('../components/Familyinformation.vue')
			},
			{
				path: '/Health',
				component: () => import('../components/Health.vue')
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})
router.beforeEach((to, from, next) => {
	//添加路由导航守卫
	// if (to.path === '/login') {
	// 	return next()
	// } else if (window.sessionStorage.getItem('token')) {
	// 	return next()
	// } else {
	// 	return next('/login')
	// }
	if (to.path === '/login' || window.sessionStorage.getItem('token')) return next()
	return next('/login')
})

export default router
