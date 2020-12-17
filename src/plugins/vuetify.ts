// import Vue from 'vue'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

// Vue.use(Vuetify)
// const opts = {}
// export default new Vuetify(opts)

import Vue from "vue";
import Vuetify from "vuetify";
import "material-design-icons-iconfont";
import zhHans from "vuetify/es5/locale/zh-Hans";
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);

const vuetify = new Vuetify({
  lang: {
    locales: { zhHans },
    current: "zhHans"
  },
  icons: {
    iconfont: "md"
  }
});
export default vuetify;
