import Vue from 'vue'
import Router from 'vue-router'
import Movie from './views/Movie.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'movie',
      component: Movie
    },
    {
    	path:'/cinema',
    	name:'cinema',
    	component:() => import('./views/Cinema.vue')
    },
    {
    	path:'/mine',
    	name:'mine',
    	component:() => import('./views/Mine.vue')
    },
    {
    	path:'/search',
    	name:'search',
    	component:() => import('./views/Search.vue')
    },
    {
    	path:'/details',
    	name:'details',
    	component:() => import('./views/Details.vue')
    },
    {
    	path:'/detailsTwo',
    	name:'detailsTwo',
    	component:() => import('./views/DetailsTwo.vue')
    },
    {
    	path:'/video',
    	name:'video',
    	component:() => import('./views/Video.vue')
    },
    {
    	path:'/cinemasearch',
    	name:'/cinemasearch',
    	component:() => import('./views/Cinemasearch.vue')
    },
   	{
   		path:'/sign',
   		name:'/sign',
   		component:() => import('./views/Sign.vue')
   	},
   	{
   	  path:'/cinemadetails',
   		name:'/cinemadetails',
   		component:() => import('./views/Cinemadetails.vue')
   	},
   	{
   	  path:'/goupiao',
   		name:'goupiao',
   		component:() => import('./views/Goupiao.vue')
   	}
//  {
//    path: '/about',
//    name: 'about',
//    // route level code-splitting
//    // this generates a separate chunk (about.[hash].js) for this route
//    // which is lazy-loaded when the route is visited.
//    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//  }
  ],
  linkActiveClass: 'activec',
})
