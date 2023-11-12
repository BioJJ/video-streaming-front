import { authGuard } from '../_helpers/navigationGuards'

const videosRoutes = [
	{
		path: '/videos',
		name: 'Videos',
		beforeEnter: authGuard,
		meta: {
			title: 'Videos'
		},
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/video/Videos.vue')
	},
	{
		path: '/videos/create',
		name: 'VideosForm',
		beforeEnter: authGuard,
		meta: {
			title: 'Videos'
		},
		component: () => import('../views/video/VideosForm.vue')
	},
	{
		path: '/videos/edit/:id',
		name: 'VideosEdit',
		beforeEnter: authGuard,
		meta: {
			title: 'Videos'
		},
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/video/VideosForm.vue')
	},
	{
		path: '/videos/view/:id',
		name: 'VideosView',
		beforeEnter: authGuard,
		meta: {
			title: 'Videos'
		},
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/video/VideosView.vue')
	}
]

export default videosRoutes
