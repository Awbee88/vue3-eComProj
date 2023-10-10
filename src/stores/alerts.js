import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', () => {
  const messages = ref([])
  const all = computed(() => messages.value)
  function add({ text }) {
    messages.value.push(text)
  }

  return { messages, all, add }
})
