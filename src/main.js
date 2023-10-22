import 'bootstrap/dist/css/bootstrap.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useCartStore } from './stores/cart'
import { useProductsStore } from './stores/products'
import { useAlertsStore } from './stores/alerts';
import { useUserStore } from './stores/user'

import { addResponseHandler } from './api/http';

const app = createApp(App);
app.use(createPinia());
app.use(router);

const cartStore = useCartStore();
const productsStore = useProductsStore();
const alertsStore = useAlertsStore();
const userStore = useUserStore();


// userStore.autoLogin();
cartStore.load().catch(e => {
    alertsStore.add({
        text: `Ошибка ответа от сервера при загрузке корзины Рекомендуем перезагрузить страницу`,
    });
});
productsStore.load().then(() => {
    app.mount('#app')
});

addResponseHandler(
    function (response) {

        if('errorAlert' in response.config) {
            response.data = { res: true, data: response.data}
        }

        return response;
    },
    function (error) {

        let resConfig = error.config;
        console.log(resConfig);

        if(error.response.status == 401 && resConfig.silence401 !== true) {
            router.push({name: 'login'}).then(()=> {
                location.reload();
            });
            return;
        }

        if ('errorAlert' in resConfig) {
            alertsStore.add({
                text: `Ошибка ответа от сервера ${resConfig.errorAlert}`,
                timeout: 5000,
            });

            return {data: {res: false, data: null}};
        }

        Promise.reject(error);
    }
);


