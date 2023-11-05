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
			import(/* webpackChunkName: "home" */ './../views/video/videos.vue')
	},
	{
		path: '/videos/create',
		name: 'VideosForm',
		beforeEnter: authGuard,
		meta: {
			title: 'Videos'
		},
		component: () => import('../views/video/videosForm.vue')
	},
	{
		path: '/videos/edit/:id',
		name: 'VideosEdit',
		beforeEnter: authGuard,
		meta: {
			title: 'Videos'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/video/videosForm.vue')
	},
	{
		path: '/videos/view/:id',
		name: 'VideosView',
		beforeEnter: authGuard,
		meta: {
			title: 'Videos'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/video/videosView.vue')
	}
]

export default videosRoutes
