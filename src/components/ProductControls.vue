<template>
  <div>
    <button type="button" class="btn btn-danger" @click="cartStore.remove({ id })" v-if="inCart" :disabled="inProccess">
      Remove
    </button>
    <button type="button" class="btn btn-success" @click="cartStore.add({ id })" v-else :disabled="inProccess">
      Add to cart
    </button>
    <transition name="slide">
      <div v-if="inCart">
        <hr />
        <button type="button" class="btn btn-warning" :disabled="inProccess || cnt < 2"
          @click="cartStore.setCnt({ id, cnt: cnt - 1 })">
          -
        </button>
        <strong class="mx-1">{{ cnt }}</strong>
        <button type="button" class="btn btn-success" :disabled="inProccess"
          @click="cartStore.setCnt({ id, cnt: cnt + 1 })">
          +
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()

const props = defineProps({
  id: Number
})

const cnt = computed(() => cartStore.itemCnt(props.id))
const inCart = computed(() => cartStore.inCart(props.id))
const inProccess = computed(() => cartStore.inProccess(props.id))

// export default {
// props: {
//   id: Number
// },
// computed: {
//   ...mapGetters('cart', {
//     inCartProxy: 'inCart',
//     inProccessProxy: 'inProccess',
//     cntProxy: 'itemCnt'
//   }),
//   cnt() {
//     return this.cntProxy(this.id)
//   },
//   inCart() {
//     return this.inCartProxy(this.id)
//   },
//   inProccess() {
//     return this.inProccessProxy(this.id)
//   }
// },
// methods: {
//   ...mapActions('cart', ['add', 'remove', 'setCnt'])
// }
// }
</script>
