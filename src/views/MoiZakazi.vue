<template lang="pug">
    v-container
      v-sheet(fixed elevation="1" ).chips-wrp
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
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';
import dialogMessages from '../scripts/dialogMessages';

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
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'customer',
          status: 'await',
        })
        .then((response) => (this.checkResponse(response)))
        .catch((error) => {
          logger.log(error);
        });
    },
    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.awaitOrders = response.data.data;
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push('auth'),
          );
          break;
        case 'NotExist':
          break;
        default:
          logger.log(response);
          break;
      }
    },
    getProcessOrders() {
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'customer',
          status: 'process',
        })
        .then((response) => (this.checkProcessOrdersResponse(response)))
        .catch((error) => {
          logger.log(error);
        });
    },
    checkProcessOrdersResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.processOrders = response.data.data.reverse();
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push('auth'),
          );
          break;
        default:
          logger.log(response);
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
   .chips-wrp {
    top 48px
    position fixed
    width 100%
    z-index 2
    left 0
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.1),
                0px 1px 1px 0px rgba(0, 0, 0, 0.11),
                0px 1px 3px 0px rgba(0, 0, 0, 0.01) !important;
  }

 .await-order-list:first-child,
 .process-order-list:first-child {
   margin-top 0
 }

 .await-order-list, .process-order-list {
   margin-top: 48px
 }

 .active-chip {
   background-color #56d67b
   color #56d67b !important
   text-color #56d67b
 }
</style>
