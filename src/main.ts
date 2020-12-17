import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from '@/App'
import router from '@/routes'

new Vue({
  router,
  vuetify,
  el: '#app',
  render: h => h(App)
})
