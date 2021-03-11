`<template lang="pug">
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
    OrderCard1(v-else-if="loadType === 'order'"
              v-for='order in awaitOrders'
              type="await"
              :key='order.id'
              :item='order')
</template>

<script>
import axios from 'axios';
import { FulfillingSquareSpinner } from 'epic-spinners';
import OrderCard1 from '../../views/OrderCard1.vue';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';
import dialog from '../../scripts/openDialog';

export default {
  name: 'await-orders',
  data: () => ({
    loadType: 'icon',
    textForUser1: '',
    textForUser2: '',
  }),
  components: {
    axios,
    OrderCard1,
    FulfillingSquareSpinner,
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
          this.$store.dispatch('setMyOrders', response.data.data);
          this.loadType = 'order';
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
        case 'notExist':
          this.textForUser1 = 'Вы пока не создали ни одного заказа';
          this.loadType = 'text';
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
    awaitOrders() {
      return this.$store.getters.getMyOrders;
    },
  },
  created() {
    this.getData();
    this.$store.dispatch('setChipStatus', 'await');
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
