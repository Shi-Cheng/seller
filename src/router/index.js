import Vue from 'vue'
import Router from 'vue-router'

const Seller = (resolve) => {
  import('components/seller/seller').then((modules) => {
    resolve(modules)
  })
}

const Goods = (resolve) => {
  import('components/goods/base-goods').then((modules) => {
    resolve(modules)
  })
}

const Ratings = (resolve) => {
  import('components/rating/rating').then((modules) => {
    resolve(modules)
  })
}
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/rating',
      name: 'rating',
      component: Ratings
    }
  ]
})
