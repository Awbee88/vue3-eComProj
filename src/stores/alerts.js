import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', () => {
  const messages = ref([]);
  let alertId = 0;

  const all = computed(() => messages.value);

  function add(payload) {
    messages.value.push({...payload, id: alertId});
    alertId++;
  }

  return {
    messages,
    all,
    add,
  }
})
