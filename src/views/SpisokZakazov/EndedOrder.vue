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
    OrderCard2(v-else-if="loadType === 'order'"
               v-for='item in endedOrders'
               type='ended'
               :key='item._id'
               :item='item')
</template>

<script>
import axios from 'axios';
import { FulfillingSquareSpinner } from 'epic-spinners';
import OrderCard2 from '../OrderCard2.vue';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';
import dialog from '../../scripts/openDialog';
import feedbackDialog from '../../components/FeedbackDialog.vue';

export default {
  name: 'endedOrder',
  data: () => ({
    endedOrders: null,
    type: 'ended',
    loadType: 'icon',
    textForUser1: '',
    textForUser2: '',
  }),
  components: {
    OrderCard2,
    axios,
    FulfillingSquareSpinner,
    feedbackDialog,
  },
  methods: {
    getEndedOrders() {
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'completed',
        })
        .then((response) => (this.checkEndedOrdersResponse(response)))
        .catch((error) => {
          logger.log(error);
        });
    },

    checkEndedOrdersResponse(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.endedOrders = response.data.data;
          this.loadType = 'order';
          // this.$store.dispatch('setProcessOrder', this.processOrders);
          break;
        case 'notExist':
          this.textForUser1 = 'У вас нет завершенных заказов';
          this.loadType = 'text';
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
        this.getEndedOrders();
      }
    },
  },
  created() {
    this.$store.dispatch('setChipStatus', 'ended');
    if (this.token) {
      this.getEndedOrders();
    }
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
