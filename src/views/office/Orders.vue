<template>
  <div>
    <h1>User orders</h1>
    <div></div>
  </div>
</template>

<script setup>
import {getOrders} from '@/api/orders'
import { onMounted } from 'vue'

onMounted(() => {
  getOrders().then(console.log);
})

</script>
