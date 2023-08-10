import Vue from 'vue';
import App from './App';
import 'amfe-flexible'
import { router } from './router';
import store from './store'
import { Form } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { Picker } from 'vant';
import {Popup} from 'vant';
import { Stepper } from 'vant';
import { Dialog } from 'vant';
import { Notify } from 'vant';
Vue.use(Notify);
Vue.use(Picker);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Dialog);
Vue.use(Stepper);
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});
