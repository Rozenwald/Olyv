<template lang='pug'>
    .container
      OrderCard1(
      v-for='item in items'
      :key='item.id'
      :title='item.title'
      :cost1='item.cost1')
</template>

<script>
import axios from 'axios';
import OrderCard1 from './OrderCard1.vue';

export default {
  name: 'OrderCard',
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
        .post('http://test.cabinet.olyv.services:8888/api/v1/private/order', {
          token: this.token,
          method: 'receive',
          submethod: 'my',
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
  .setting{
    padding 0 15px
    background-color white
  }

  .right_arrow{
    width 8px !important
    height auto !important
  }

  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }

  .v-list-item:last-child {
    border-bottom none
  }

</style>
