import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './modules';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faDollarSign, faUserCircle, faBell} from '@fortawesome/free-solid-svg-icons';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faDollarSign, faUserCircle, faBell);

Vue.config.productionTip = false;

Vue.use(VeeValidate);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuex);

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
