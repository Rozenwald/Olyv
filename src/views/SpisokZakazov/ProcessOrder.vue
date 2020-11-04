<template lang="pug">
  .order-container {{textForUser}}
    v-row.icon-container(justify='center' align='center' v-if='loadType')
      semipolar-spinner(:animation-duration="1500"
                        :size="75"
                        :color="'#fd7363'")
    OrderCard2(v-else
               v-for='item in processOrders'
               type='process'
               :key='item._id'
               :item='item')
</template>

<script>
import axios from 'axios';
import { SemipolarSpinner } from 'epic-spinners';
import OrderCard2 from '../OrderCard2.vue';

export default {
  name: 'allOrder',
  data: () => ({
    processOrders: null,
    textForUser: '',
    error: '',
    type: 'process',
    loadType: true,
  }),
  components: {
    OrderCard2,
    axios,
    SemipolarSpinner,
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
          this.loadType = false;
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
  watch: {
    token() {
      if (this.token) {
        this.getProcessOrders();
      }
    },
  },
  created() {
    if (this.token) {
      this.getProcessOrders();
    }
  },
};
</script>

<style lang="stylus" scoped>
  .order-container{
    padding 0
    height 100%
  }
  .icon-container{
    padding-bottom: 75px
    height 100%
  }
  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }
  .v-list-item:last-child {
    border-bottom none
  }
</style>
