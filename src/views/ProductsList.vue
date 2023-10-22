<template>
  <div>
    <h1>Products</h1>
    <div class="row">
      <div
        class="col col-sm-4"
        :class="$style.col"
        v-for="product in productsStore.all"
        :key="product.id"
      >
        <div class="card">
          <div class="card-body">
            <h3>{{ product.title }}</h3>
            <div>{{ product.price }}</div>
            <router-link :to="{ name: 'products-item', params: { id: product.id } }">
              Get more
            </router-link>
            <hr />
            <ProductControls :id="product.id"></ProductControls>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductControls from '@/components/ProductControls.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore();

// export default {
//   components: {
//     ProductControls
//   },
//   computed: {
//     ...mapGetters('products', { products: 'all' })
//   }
// }
</script>

<style module>
.col {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
