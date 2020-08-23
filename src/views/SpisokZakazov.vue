<template lang="pug">
    v-container
      v-row.chips(v-show="user.verification == 'completed'")
        v-chip-group(v-model="type" mandatory active-class="active-chip")
          v-chip(value="free") Все заказы
          v-chip(value="await") В ожидании
          v-chip(value="process") В процессе

      .order-list
      .free-list(v-for='item in items' v-show="type=='free'")
        OrderCard2(
                  type='free'
                  :key='item._id'
                  :item='item'
                  )
      .await-list(v-for='item in myOrders' v-show="type=='await'")
        OrderCard2(
                  type='await'
                  :key='item._id'
                  :item='item'
                  )
      .process-list(v-for='item in processOrders' v-show="type=='process'")
        OrderCard2(
                  type='process'
                  :key='item._id'
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
    type: 'free',
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
          status: 'process',
        })
        .then((response) => (this.checkMyResponseOrder(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkMyResponseOrder(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          response.data.data.forEach((element) => {
            this.getOrder(element);
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
    getOrder(element) {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
          id: element.idOrder,
        })
        .then((response) => (this.checkOrder(response, element)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkOrder(response, element) {
      switch (response.data.status) {
        case 'success':
          this.myOrders.push(response.data.data[0]);
          // eslint-disable-next-line no-underscore-dangle
          this.myOrders[this.myOrders.length - 1].idResponse = element._id;
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
        .post(`${this.$baseUrl}api/v1/private/order`, {
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
      switch (response.data.status) {
        case 'success':
          this.processOrders = response.data.data;
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
  .await-list:first-child, .free-list:first-child, .free-process:first-child {
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
  .chips {
    margin 0 12px
  }

  .active-chip {
    background-color #56d68b
    color #FFFFFF !important
  }
</style>
