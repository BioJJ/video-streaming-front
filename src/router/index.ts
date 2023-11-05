import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authGuard, authGuardLayout } from '../_helpers/navigationGuards'
import videosRoutes from './videos.routes'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('./../layouts/default/Default.vue'),
		beforeEnter: authGuardLayout,
		children: [
			{
				path: '/home',
				name: 'Home',
				beforeEnter: authGuard,
				meta: {
					title: 'Dashboard'
				},
				component: () =>
					import(/* webpackChunkName: "home" */ './../views/home/Home.vue')
			},
			{
				path: '/user',
				name: 'User',
				beforeEnter: authGuard,
				meta: {
					title: 'User'
				},
				component: () =>
					import(/* webpackChunkName: "home" */ './../views/user/User.vue')
			},
			...videosRoutes
		]
	},
	{
		path: '/login',
		name: 'Login',
		beforeEnter: authGuard,
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/login/Login.vue')
	},
	{
		path: '/register',
		name: 'Register',
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/login/RegisterView.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
