/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import mitt from 'mitt';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const pinia = createPinia()
const emitter = mitt()
const app = createApp(App)
app.provide('emitter',emitter)
app.use(pinia)
app.use(VueAwesomePaginate)
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    pauseOnHover: false,
    newestOnTop: true
  });
  app.component('VueDatePicker', VueDatePicker);

registerPlugins(app)

app.mount('#app')
