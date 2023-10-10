import * as productsApi from '@/api/products.js'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const items = ref(null)
  const all = computed(() => items.value)
  const one = computed((id) => items.value.find((pr) => pr.id == id))

  async function load() {
    let products = await productsApi.all()
    items.value = products
    return products
  }

  return { items, all, one, load }
})
