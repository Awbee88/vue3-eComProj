import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

import ProductsList from '@/views/ProductsList.vue'
import Product from '@/views/Product.vue'
import Cart from '@/views/Cart.vue'
import Checkout from '@/views/Checkout.vue'
import E404 from '@/views/E404.vue'
import Login from '@/views/Login.vue'
import OfficeBase from '@/views/office/Base.vue'
import OfficeIndex from '@/views/office/Index.vue'
import OfficeOrders from '@/views/office/Orders.vue'

let routes = [
  {
    name: 'products',
    path: '/',
    component: ProductsList
  },
  {
    name: 'products-item',
    path: '/products/:id',
    component: Product
  },
  {
    name: 'cart',
    path: '/cart',
    component: Cart
  },
  {
    name: 'checkout',
    path: '/order',
    component: Checkout
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    beforeEnter: async(to, from, next) => {
      const userStore = useUserStore();
      await userStore.isReadyLogin;
      userStore.isLogin ? next({name: 'office'}) : next();
    }
  },
  {
    path: '/office',
    component: OfficeBase,
    meta: { auth: true },
    children: [
      {
        name: 'office',
        path: '',
        component: OfficeIndex
      },
      {
        name: 'office-orders',
        path: 'orders',
        component: OfficeOrders
      }
    ]
  },
  {
    path: '/:any(.*)',
    component: E404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if(to.meta.auth && !userStore.isLogin) {
    next({name: 'login'})
  } else {
    next();
  }
});

export default router
