`<template lang="pug">
  .order-container
    v-row.icon-container(justify='center' align='center' v-if="loadType ==='icon'")
      semipolar-spinner(:animation-duration="1500"
                        :size="75"
                        :color="'#fd7363'")
    v-row.text-container(justify='center'
                         align='center'
                         v-else-if="loadType === 'text'")
      .errorText-container
        span.errorText-container {{textForUser1}} <br/>
        span.errorText-container {{textForUser2}}
    OrderCard1(v-else-if="loadType === 'order'"
              v-for='order in processOrders'
              type="process"
              :key='order.id'
              :item='order')
</template>

<script>
import axios from 'axios';
import { SemipolarSpinner } from 'epic-spinners';
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
    SemipolarSpinner,
  },
  methods: {
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
          this.$store.dispatch('setMyProcessOrders', response.data.data);
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
          this.textForUser1 = 'Пока что ни один из ваших заказов не находится в исполнении';
          this.textForUser2 = 'Выберите исполнителя из числа откликнувшихся пользователей';
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
    processOrders() {
      return this.$store.getters.getMyProcessOrders;
    },
  },
  created() {
    this.$store.dispatch('setChipStatus', 'process');
    this.getProcessOrders();
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

  .process-order-list {
    margin-top: 48px
  }
</style>
