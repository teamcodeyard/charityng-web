import '@babel/polyfill';
import 'mutationobserver-shim';
import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import 'vue3-carousel/dist/carousel.css';

const app = createApp(App).use(i18n).use(store).use(router);

const emitter = mitt();
app.config.globalProperties.$eventBus = emitter;

app.mount('#app');
