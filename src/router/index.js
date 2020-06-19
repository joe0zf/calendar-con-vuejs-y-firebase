import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'
//import db from '../main'
Vue.use(VueRouter)

  const routes = [
  {
    path:'*',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/primero-a-secundaria',
    name: 'primeroa',
    component: () => import('../views/secundaria/PrimeroA.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/primero-b-secundaria',
    name: 'primerob',
    component: () => import('../views/secundaria/PrimeroB.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/segundo-a-secundaria',
    name: 'segundoa',
    component: () => import('../views/secundaria/SegundoA.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/segundo-b-secundaria',
    name: 'segundob',
    component: () => import('../views/secundaria/SegundoB.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/tercero-a-secundaria',
    name: 'terceroa',
    component: () => import('../views/secundaria/TerceroA.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/tercero-b-secundaria',
    name: 'tercerob',
    component: () => import('../views/secundaria/TerceroB.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/cuarto-secundaria',
    name: 'cuarto',
    component: () => import('../views/secundaria/Cuarto.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/quinto-secundaria',
    name: 'quinto',
    component: () => import('../views/secundaria/Quinto.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/primero-a-primaria',
    name: 'primeroaprimaria',
    component: () => import('../views/primaria/PrimeroA.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/primero-b-primaria',
    name: 'primerobprimaria',
    component: () => import('../views/primaria/PrimeroB.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/primero-c-primaria',
    name: 'primerocprimaria',
    component: () => import('../views/primaria/PrimeroC.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/segundo-a-primaria',
    name: 'segundoaprimaria',
    component: () => import('../views/primaria/SegundoA.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/segundo-b-primaria',
    name: 'segundobprimaria',
    component: () => import('../views/primaria/SegundoB.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/tercero-primaria',
    name: 'terceroprimaria',
    component: () => import('../views/primaria/Tercero.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/cuarto-a-primaria',
    name: 'cuartoaprimaria',
    component: () => import('../views/primaria/CuartoA.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/cuarto-b-primaria',
    name: 'cuartobprimaria',
    component: () => import('../views/primaria/CuartoB.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/quinto-primaria',
    name: 'quintoprimaria',
    component: () => import('../views/primaria/Quinto.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/sexto-primaria',
    name: 'sextoprimaria',
    component: () => import('../views/primaria/Sexto.vue'),
    meta:{
      requiresAuth:true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  
  let usuario = firebase.auth().currentUser;
  let autorizacion = to.matched.some(record => record.meta.requiresAuth);

  if( autorizacion && !usuario){
    next('login')
  }
  else if(!autorizacion && usuario)
  {
    router.replace('/');
  }
  else{
    next();
  }
})

export default router
