<template>
    <div class="box">
        <transition-group name="alert">
            <div class="item" v-for="item in alertsStore.all" :key="item.id">
                {{ item.text }}
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import { useAlertsStore } from '@/stores/alerts';
import { computed, watch } from 'vue';

const alertsStore = useAlertsStore();


watch(alertsStore.all, (newAlerts, oldAlerts) => {
    if(newAlerts.length){

        let lastAlertIndex = alertsStore.all.length - 1;
        let lastAlert = alertsStore.all[lastAlertIndex];

        if('timeout' in lastAlert) {
            setTimeout(function() {
                alertsStore.messages.splice(lastAlertIndex, 1);
            }, lastAlert.timeout)
        }
    }
})

</script>

<style scoped>
.box {
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    z-index: 10000;
    padding: 10px 10px 0 0;
}

.item {
    margin: 0 0 10px 0;
    background: #444;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 20px;
    padding: 10px;
}

.alert-enter-from {
    opacity: 0;
}

.alert-enter-active {
    transition: opacity 0.5s;
    opacity: 1;
}

.alert-leave-active {
    transition: opacity 0.5s;
    opacity: 0;
}
</style>