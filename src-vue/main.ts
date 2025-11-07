import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './main.less'

createApp(App)
  .use(createPinia())
  .mount('#app')
