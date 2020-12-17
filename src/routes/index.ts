import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import GlobalConfig from '@/store/modules/global'

Vue.use(VueRouter)

const baseURI = ''

const indexRouter = 'index'

// 不需要写component属性, 会自动根据route的那么找对应的页面,
const routesConfig: RouteConfig[] = [
  {
    name: 'index',
    path: `${baseURI}/index.html`,
    meta: {
      title: 'Vuetify-tsx-template'
    }
  },

  /** 404 Router */
  {
    name: 'notFound',
    path: `${baseURI}/404.html`,
    meta: {
      title: '404 Not Found'
    }
  },

  {
    path: '*',
    redirect: {
      name: 'notFound'
    }
  },

  /** Home Redirect */
  {
    path: '/',
    redirect: {
      name: indexRouter
    }
  },

  {
    path: baseURI,
    redirect: {
      name: indexRouter
    }
  }
]

const routes = routesConfig.map(route => {
  return route.name
    ? { ...route, component: () => import(/* webpackChunkName: "[request]" */ `../pages/${route.name}.tsx`) }
    : { ...route }
})

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // 根据 route 中的 meta.title 设置页面标题.
  if (to.meta.title) {
    document.title = to.meta.title || '默认标题'
  }
  // 当 router.push 一个不存在的路由时,
  // 将跳转 404 页面. 并且将错误的 route 的 name 传递到 NotFound 中.
  if (to.matched.length > 0) {
    GlobalConfig.updatePageLoading();
    next()
  } else {
    next({
      name: 'notFound',
      params: {
        name: to.name || ''
      }
    })
  }
})

router.afterEach(()=>{
  GlobalConfig.updatePageLoading()
})

export default router
