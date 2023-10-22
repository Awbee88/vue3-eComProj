import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useProductsStore } from './products'
import { useAlertsStore } from './alerts'
import * as cartApi from '@/api/cart.js'

export const useCartStore = defineStore('cart', () => {
  const productsStore = useProductsStore();
  const alertsStore = useAlertsStore();

  // state
  const products = ref([]);
  const proccessId = ref([]);
  const token = ref(null);

  // getters
  const productsDetailed = computed(() =>
    products.value.map((pr) => {
      let { title, price } = productsStore.one(pr.id)

      return {
        ...pr,
        title,
        price
      }
    })
  );
  const totalSum = computed(() =>
    productsDetailed.value.reduce((total, pr) => {
      return total + pr.price * pr.cnt
    }, 0)
  );
  const index = (id) =>  {
    return products.value.findIndex((pr) => pr.id === id);
  };
  const inCart = (id) => {
    return index(id) !== -1;
  };
  const totalCnt = computed(() => products.value.length);
  const inProccess = (id) => proccessId.value.includes(id);
  const canAdd = (id) => !inCart(id) && !inProccess(id);
  const canUpdate = (id) => inCart(id) && !inProccess(id);
  const item = (id) => {
    let ind = index(id);
    return ind === -1 ? null : products.value[ind];
  };
  const itemCnt = (id) => item(id).cnt;

  // actions
  async function load() {
    let savedToken = localStorage.getItem('cartToken')
    let { token: tokenLoad, needUpdate, cart } = await cartApi.load(savedToken)

    if (needUpdate) {
      localStorage.setItem('cartToken', tokenLoad)
    }

    products.value = cart
    token.value = tokenLoad
  }

  async function add({ id }) {
    if (canAdd(id)) {
      proccessId.value.push(id)

      let {res, data} = await cartApi.add(token.value, id)

      if (res && data) {
        products.value.push({ id, cnt: 1 })
      }

      proccessId.value = proccessId.value.filter((rid) => rid !== id)
    }
  }
  async function remove({ id }) {
    if (canUpdate(id)) {
      proccessId.value.push(id)

      let {res, data} = await cartApi.remove(token.value, id)

      if (res && data) {
        products.value.splice(index(id), 1)
      }

      proccessId.value = proccessId.value.filter((rid) => rid !== id)
    }
  }
  async function setCnt({ id, cnt }) {
    if (canUpdate(id)) {
      proccessId.value.push(id)

      let validCnt = Math.max(1, cnt)
      let {res, data} = await cartApi.change(token.value, id, validCnt)

      if (res && data) {
        products.value[index(id)].cnt = validCnt
      }

      proccessId.value = proccessId.value.filter((rid) => rid !== id)
    }
  }

  return {
    products,
    proccessId,
    token,
    productsDetailed,
    totalSum,
    totalCnt,
    inProccess,
    canAdd,
    canUpdate,
    inCart,
    index,
    item,
    itemCnt,
    load,
    add,
    remove,
    setCnt,
  }
})

// let adasd = {
// 	async load({ commit }){
//         let savedToken = localStorage.getItem('cartToken');
//         let { token, needUpdate, cart } = await cartApi.load(savedToken);

//         if (needUpdate) {
//             localStorage.setItem('cartToken', token);
//         }

//         commit('set', { cart, token });
//     },
// 	async add({ state, getters, commit }, { id }){
//         if (getters.canAdd(id)) {
//             commit('startProccess', id);
//             let res = await cartApi.add(state.token, id)

//             if (res === true) {
//                 commit('add', { id });
//             }

//             commit('endProccess', id);
//         }
//     },
// 	async remove({ state, getters, commit }, { id }){
//         if (getters.canUpdate(id)) {
//             commit('startProccess', id);
//             let res = await cartApi.remove(state.token, id)

//             if (res === true) {
//                 commit('remove', { ind: getters.index(id) });
//             }

//             commit('endProccess', id);
//         }
//     },
// 	async setCnt({ state, getters, commit, dispatch }, { id, cnt }){
//         if (getters.canUpdate(id)) {
//             commit('startProccess', id);
//             let validCnt = Math.max(1, cnt);
//             let res = await cartApi.change(state.token, id, validCnt)

//             if (res === true) {
//                 commit('setCnt', { ind: getters.index(id), cnt: validCnt });
//             }

//             commit('endProccess', id);
//         }
//     }
// }

// export default {
//     set(state, { cart, token }) {
//         state.products = cart;
//         state.token = token;
//     },
//     add(state, { id }) {
//         state.products.push({ id, cnt: 1 });
//     },
//     remove(state, { ind }) {
//         state.products.splice(ind, 1);
//     },
//     setCnt(state, { ind, cnt }) {
//         state.products[ind].cnt = cnt;
//     },
//     startProccess(state, id) {
//         state.proccessId.push(id);
//     },
//     endProccess(state, rid) {
//         state.proccessId = state.proccessId.filter(id => id !== rid);
//     }
// }

// export default {
//     productsDetailed(state, getters, rootState, rootGetters) {
//         return state.products.map(pr => {
//             let { title, price } = rootGetters['products/one'](pr.id);

//             return {
//                 ...pr,
//                 title,
//                 price
//             }
//         });
//     },
//     totalSum(state, getters) {
//         return getters.productsDetailed.reduce((total, pr) => {
//             return total + pr.price * pr.cnt;
//         }, 0);
//     },
//     totalCnt: state => state.products.length,
//     inProccess: state => id => state.proccessId.includes(id),
//     canAdd: (state, getters) => id => !getters.inCart(id) && !getters.inProccess(id),
//     canUpdate: (state, getters) => id => getters.inCart(id) && !getters.inProccess(id),
//     inCart: (state, getters) => id => getters.index(id) !== -1,
//     index: state => id => state.products.findIndex(pr => pr.id === id),
//     item: (state, getters) => id => {
//         let ind = getters.index(id);
//         return ind === -1 ? null : state.products[ind];
//     },
//     itemCnt: (state, getters) => id => getters.item(id).cnt,
// }
