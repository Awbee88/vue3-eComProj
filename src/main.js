import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useCartStore } from './stores/cart'
import { useProductsStore } from './stores/products'

const app = createApp(App).use(createPinia()).use(router)

const cartStore = useCartStore();
const productsStore = useProductsStore();


cartStore(load)
productsStore(load).then(() => {
  app.mount('#app')
})
