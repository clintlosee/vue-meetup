import Vue from 'vue';
import moment from 'moment';
import vuelidate from 'vuelidate';
import Toasted from 'vue-toasted';
import App from './App.vue';
import router from './router';
import store from './store';

import AppDropdown from './components/shared/AppDropdown';
import AppHero from './components/shared/AppHero';
import AppSpinner from './components/shared/AppSpinner';

Vue.config.productionTip = false;

Vue.component('AppHero', AppHero);
Vue.component('AppDropdown', AppDropdown);
Vue.component('AppSpinner', AppSpinner);

Vue.use(vuelidate);
Vue.use(Toasted);

Vue.filter('capitalize', function(value) {
  if (value && typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return '';
});

Vue.filter('formatDate', function(value, formatType = 'LL') {
  if (!value) return '';
  return moment(value).format(formatType);
});

new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app');
