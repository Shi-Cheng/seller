// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Cube)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
