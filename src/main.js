import Vue from 'vue'
import App from './App.vue'

import '@/assets/css/app.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSkull, faHeart, faPlus, faMinus, faUndo } from '@fortawesome/free-solid-svg-icons';
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(faSkull, faHeart, faPlus, faMinus, faUndo);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


document.querySelector('#text').addEventListener('keyup', () => {
    localStorage.setItem('text', document.querySelector('#text').value);
});
