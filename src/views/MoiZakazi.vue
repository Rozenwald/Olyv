<template lang="pug">
    v-container
      v-row.switch-await
        v-switch(label="В процессе" v-model="processFlag")
      .await-order-list(v-for='order in awaitOrders' v-show="!processFlag")
        OrderCard1(
          :key='order.id'
          :item='order'
        )
      .process-order-list(v-for="order in processOrders" v-show="processFlag")
        OrderCard1(
          :key='order.id'
          :item='order'
        )
</template>

<script>
import axios from 'axios';
import OrderCard1 from './OrderCard1.vue';

export default {
  name: 'moiZakazi',
  data: () => ({
    awaitOrders: null,
    processOrders: null,
    error: '',
    processFlag: false,
  }),
  components: {
    OrderCard1,
    axios,
  },
  methods: {
    getData() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'customer',
          step: 0,
        })
        .then((response) => (this.checkResponse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.awaitOrders = response.data.data.reverse();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    getProcessOrders() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'customer',
          status: 'process',
        })
        .then((response) => (this.checkProcessOrdersResponse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkProcessOrdersResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.processOrders = response.data.data.reverse();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Мои заказы');
    this.getData();
    this.getProcessOrders();
  },
};
</script>

<style lang="stylus" scoped>
 .container{
   padding-left 0.01px
   padding-right 0.01px
 }

 .switch-await {
   margin 0 12px
 }

 .await-order-list:first-child {
   margin-top 0
 }
</style>
