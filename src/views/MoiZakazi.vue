<template lang="pug">
    v-container
      .order-list(v-for='item in items')
        OrderCard1(
          :key='item.id'
          :item='item'
        )
</template>

<script>
import axios from 'axios';
import OrderCard1 from './OrderCard1.vue';

export default {
  name: 'moiZakazi',
  data: () => ({
    items: null,
    error: '',
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
          this.items = response.data.data.reverse();
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
  },
};
</script>

<style lang="stylus" scoped>
 .container{
   padding-left 0.01px
   padding-right 0.01px
 }
 .order-list:first-child {
   margin-top 0
 }
</style>
