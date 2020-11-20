<template lang="pug">
    v-container
      v-row.chips(align='center' justify='space-around' )

        v-chip-group(v-model="type" mandatory active-class="active-chip")
          v-chip(value="all"
                outlined
                color="#56d67b"
                text-color="#000") В ожидании
          v-chip(value="process"
                outlined
                color="#56d67b"
                text-color="#000") В процессе

      .await-order-list(v-show="type=='all'")
        OrderCard1(
          v-for='order in awaitOrders'
          type="await"
          :key='order.id'
          :item='order'
        )
      .process-order-list(v-show="type=='process'")
        OrderCard1(
          v-for="order in processOrders"
          type="process"
          :key='order.id'
          :item='order'
        )
</template>

<script>
import axios from 'axios';
import store from '../store';
import OrderCard1 from './OrderCard1.vue';

export default {
  name: 'moiZakazi',
  data: () => ({
    awaitOrders: null,
    processOrders: null,
    error: '',
    type: 'all',
  }),
  components: {
    OrderCard1,
    axios,
    store,
  },
  methods: {
    getData() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'customer',
          status: 'await',
        })
        .then((response) => (this.checkResponse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkResponse(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.awaitOrders = response.data.data;
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
  watch: {
    token() {
      if (this.token) {
        this.getData();
        this.getProcessOrders();
      }
    },
  },
  created() {
    this.$store.commit('setTitle', 'Заказчик');
    if (this.token) {
      this.getData();
      this.getProcessOrders();
    }
  },
};
</script>

<style lang="stylus" scoped>

 .chips {
   margin-bottom 12px
   background: #e3e3e3 50%
   padding-left 15px
   padding-right 15px
 }

 .await-order-list:first-child {
   margin-top 0
 }

 .active-chip {
   background-color #56d67b
   color #56d67b !important
   text-color #56d67b
 }
</style>
