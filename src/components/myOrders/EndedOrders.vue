<template lang="pug">
  .order-container
    v-row.icon-container(justify='center' align='center' v-if="loadType ==='icon'")
      fulfilling-square-spinner(:animation-duration="1500"
                        :size="75"
                        :color="'#56D68B'")
    v-row.text-container(justify='center'
                         align='center'
                         v-else-if="loadType === 'text'")
      .errorText-container
        span.errorText-container {{textForUser1}} <br/>
        span.errorText-container {{textForUser2}}
    FeedbackOrderCard(v-else-if="loadType === 'order'"
              v-for='item in endedOrders'
              type="endedCustomer"
              :key='item.idOrder'
              :item='item')
</template>

<script>
import axios from 'axios';
import { FulfillingSquareSpinner } from 'epic-spinners';
import FeedbackOrderCard from '../../views/FeedbackOrderCard.vue';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';
import dialog from '../../scripts/openDialog';

export default {
  name: 'ended-orders',
  data: () => ({
    orders: [],
    loadType: 'icon',
    textForUser1: '',
    textForUser2: '',
  }),
  components: {
    axios,
    FeedbackOrderCard,
    FulfillingSquareSpinner,
  },
  methods: {
    async getFeedbacks() {
      console.log(this.token);
      const res = await this.$root.feedbackAPI.receiveMyAwait();
      console.log(res);
      switch (res.data.status) {
        case 'success':
          res.data.data.forEach((el) => {
            if (el.order.idUserCustomer === el.from) {
              this.orders.push(el);
            }
          });
          console.log(this.orders[0]);
          if (!this.orders[0]) {
            this.textForUser1 = 'Пока что ни один из ваших заказов не завершен';
            this.loadType = 'text';
          } else {
            this.orders.reverse();
            this.$store.dispatch('setAwaitCustomerFeedbacks', this.orders);
            this.loadType = 'order';
          }
          console.log(this.loadType);
          break;
        case 'notAccess':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        case 'notSuccess':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          break;
        case 'alreadyExist':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('alreadyExist'),
            true,
            false,
          );
          break;
        case 'notExist ':
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          logger.log(res);
          break;
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    orderType() {
      return this.$store.getters.getOrderType;
    },
    endedOrders() {
      return this.$store.getters.getAwaitCustomerFeedbacks;
    },
  },
  created() {
    this.getFeedbacks();
    this.$store.dispatch('setChipStatus', 'ended');
  },
};
</script>

<style lang="stylus" scoped>
  .text-container{
    text-align center
    height 100%
    padding-bottom: 75px
  }
  .errorText-container{
    display: inline-block
    font-style normal
    font-weight bold
    font-size 18px
  }
  .order-container {
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
 .await-order-list:first-child {
   margin-top: 48px
 }
</style>
