import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import * as authApi from '@/api/auth.js'

export const useUserStore = defineStore('user', () => {

  const user = ref(null);

  const isLogin = computed(() => user.value != null);
  const isReadyLogin = computed(() => {
    return autoLogin();
  })

  async function login (login, password) {
    let { res, data } = await authApi.login(login, password);
    console.log(res, data);
    if(!res) {
      return { errors: 'Ошибка логина'}
    } else if (data.res) {
      user.value = data.user;
    }

    return data;
  }

  async function autoLogin() {
    let {res, user: userCheck} = await authApi.check();

    if (res) {
      user.value = userCheck;
    }

    return res;
  }

  return { 
    user,
    isLogin,
    login,
    autoLogin,
    isReadyLogin,
   }
})
