<template>
  <div>
    <h1>Cart</h1>
    <hr />
    <div v-if="hasProducts">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Cnt</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartStore.productsDetailed" :key="product.id">
            <td>{{ product.title }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.cnt }}</td>
            <td>{{ product.price * product.cnt }}</td>
            <td>
              <button
                type="button"
                class="btn btn-warning mr-1"
                :disabled="cartStore.inProccess(product.id) || product.cnt < 2"
                @click="cartStore.setCnt({ id: product.id, cnt: product.cnt - 1 })"
              >
                -
              </button>
              <button
                type="button"
                class="btn btn-success mr-1"
                @click="cartStore.setCnt({ id: product.id, cnt: product.cnt + 1 })"
                :disabled="cartStore.inProccess(product.id)"
              >
                +
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="cartStore.remove({ id: product.id })"
                :disabled="cartStore.inProccess(product.id)"
              >
                X
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <router-link class="btn btn-primary" :to="{ name: 'checkout' }"> Order Now </router-link>
    </div>
    <div v-else class="alert alert-warning">Yout cart is empty!</div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()

const hasProducts = computed(() => cartStore.productsDetailed.length > 0)

// export default {
//   computed: {
//     ...mapGetters('cart', {
//       products: 'productsDetailed',
//       inProccess: 'inProccess'
//     }),
//     hasProducts() {
//       return this.products.length > 0
//     }
//   },
//   methods: {
//     ...mapActions('cart', ['setCnt', 'remove'])
//   }
// }
</script>
