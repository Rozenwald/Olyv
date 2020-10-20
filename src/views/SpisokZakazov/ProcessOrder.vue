<template lang="pug">
  .orderContainer
    OrderCard2(
              v-for='item in processOrders'
              type='process'
              :key='item._id'
              :item='item')
</template>

<script>
import axios from 'axios';
import OrderCard2 from '../OrderCard2.vue';

export default {
  name: 'allOrder',
  data: () => ({
    processOrders: null,
    error: '',
    type: 'process',
  }),
  components: {
    OrderCard2,
    axios,
  },
  methods: {
    // Получаю объект с массивом заказов которые в исполнении
    getProcessOrders() {
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'process',
        })
        .then((response) => (this.checkProcessOrdersResponse(response)))
      // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },
    // Создаю массив и отправляю его во Vuex
    checkProcessOrdersResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.processOrders = response.data.data;
          // this.$store.dispatch('setProcessOrder', this.processOrders);
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
    user() {
      return this.$store.getters.getUser;
    },
  },
  created() {
    this.getProcessOrders();
  },
};
</script>

<style lang="stylus" scoped>
  .orderContainer{
    padding 0
  }
  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }
  .v-list-item:last-child {
    border-bottom none
  }
</style>
