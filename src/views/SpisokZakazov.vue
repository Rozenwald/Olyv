<template lang="pug">
    v-container
      v-row.switch-await(v-show="user.verification == 'completed'")
        v-radio-group(v-model="orderType" row)
          v-radio(label="Свободны" value="free")
          v-radio(label="В ожидании" value="await")
          v-radio(label="В процессе" value="process")

      .order-list
      .free-list(v-for='item in items' v-show="orderType=='free'")
        OrderCard2(
                  :key='item.id'
                  :item='item'
                  )
      .await-list(v-for='item in myOrders' v-show="orderType=='await'")
        OrderCard2(
                  :key='item.id'
                  :item='item'
                  )
      .await-list(v-for='item in processOrders' v-show="orderType=='process'")
        OrderCard2(
                  :key='item.id'
                  :item='item'
                  )
</template>

<script>
import axios from 'axios';
import OrderCard2 from './OrderCard2.vue';

export default {
  name: 'spisokZakazov',
  data: () => ({
    items: null,
    myOrders: [],
    processOrders: null,
    error: '',
    orderType: 'free',
  }),
  components: {
    OrderCard2,
    axios,
  },
  methods: {
    getData() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
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
    getMyResponseOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
        })
        .then((response) => (this.checkMyResponseOrder(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkMyResponseOrder(response) {
      switch (response.data.status) {
        case 'success':
          response.data.data.forEach((element) => {
            this.getOrder(element.idOrder);
          });
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'notExist':
          break;
        case 'invalidSubmethod':
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    getOrder(id) {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
          id,
        })
        .then((response) => (this.checkOrder(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkOrder(response) {
      switch (response.data.status) {
        case 'success':
          this.myOrders.push(response.data.data[0]);
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'notExist':
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    getProcessOrders() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'process',
        })
        .then((response) => (this.checkProcessOrdersResponse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },

    checkProcessOrdersResponse(response) {
      console.log(response);
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
    user() {
      return this.$store.getters.getUser;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Список заказов');
    this.getData();
    this.getMyResponseOrder();
    this.getProcessOrders();
  },
};
</script>

<style lang="stylus" scoped>
  .await-list:first-child, .free-list:first-child {
    margin-top 0
  }
  .container{
   padding-left 0.01px
   padding-right 0.01px
  }
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
  .switch-await {
    margin 0
    margin-left 15px
  }

</style>
