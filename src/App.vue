<template>
  <div id="app" class="grid-box">
    <header class="mt-3">
      <div class="container">
        {{ alertsStore.all }}
        <div class="row justify-content-between">
          <div class="col flex-norm">
            <div class="h3">Sample site</div>
            <div class="">About some and other products</div>
          </div>
          <div class="col flex-norm">
            <div>In Cart: {{ cartStore.totalCnt }}</div>
            <div>Total: {{ cartStore.totalSum }}</div>
          </div>
        </div>
        <hr />
        <nav class="navbar navbar-expand p-0">
          <ul class="navbar-nav">
            <li v-for="item in menuItems" :key="item.route" class="nav-item">
              <router-link :to="{ name: item.route }" class="nav-link" active-class="active" :exact="item.exact">
                {{ item.title }}</router-link>
            </li>
          </ul>
        </nav>
        <hr />
      </div>
    </header>
    <section>
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </section>
    <footer class="mb-3">
      <div class="container">
        <hr />
        <div>&copy; Rights not found</div>
      </div>
    </footer>
    <Alerts/>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useAlertsStore } from '@/stores/alerts'
import { useUserStore } from './stores/user'
import Alerts from '@/components/Alerts.vue'
import { ref, computed } from 'vue'

const cartStore = useCartStore();
const alertsStore = useAlertsStore();
const userStore = useUserStore();

const menuItems = computed(() => {
  let menu = [
    { route: 'products', title: 'Products', exact: true },
    { route: 'cart', title: 'Cart', exact: true },
    { route: 'checkout', title: 'Checkout', exact: true },
  ];

  menu.push( userStore.isLogin ? 
  {route: 'office', title: 'Office', exact: false} : 
  {route: 'login', title: 'Login', exact: false})

  return menu;
});

// export default {
//   data() {
//     return {
//       menuItems: [
//         { route: 'products', title: 'Products', exact: true },
//         { route: 'cart', title: 'Cart', exact: true },
//         { route: 'checkout', title: 'Checkout', exact: true }
//         /* { route: 'office', title: 'Office', exact: false } */
//       ]
//     }
//   },
//   computed: {
//     ...mapGetters('cart', { cartCount: 'totalCnt', cartTotal: 'totalSum' }),
//     ...mapGetters('alerts', { alerts: 'all' })
//   }
// }
</script>

<style>
.grid-box {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.flex-norm {
  flex: 0 1 auto !important;
  width: auto !important;
}

a.active {
  color: red !important;
}

.slide-enter-active {
  animation: slideIn 0.3s;
}

.slide-leave-active {
  animation: slideOut 0.3s;
}

@keyframes slideIn {
  from {
    transform: rotateY(90deg);
  }

  to {
    transform: rotateY(0deg);
  }
}

@keyframes slideOut {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(90deg);
  }
}
</style>
