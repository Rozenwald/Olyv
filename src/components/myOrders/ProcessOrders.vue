<template lang="pug">
  .order-container(ref="scrollUpdate")
    v-row.icon-container(justify='center' align='center' v-if='loadType')
      semipolar-spinner(:animation-duration="1500"
                        :size="75"
                        :color="'#fd7363'")
    OrderCard1(v-else
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
    loadType: true,
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
          this.loadType = false;
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
        case 'notExist':
          this.loadType = false;
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
