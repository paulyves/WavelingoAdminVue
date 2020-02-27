import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-icons/css/material-icons.css'
import 'material-icons/iconfont/material-icons.css';


Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.config.productionTip = false;
const axios = require("axios");
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.isLoggedIn){
      next({
        name : "/login"
      });
    } else {
      source.cancel();
      store.dispatch("refreshToken")
      .then(() =>{
        next();
      })
      .catch(error => {
        if(error.response.status == 401 &&
          error.response.data.error == "Token has expired")
          {
            store.dispatch("Session Timeout");
            next({
              name: "/login"
            });
          }
      });
    }
  } else {
    next();
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
