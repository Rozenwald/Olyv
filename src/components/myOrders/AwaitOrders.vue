<template lang="pug">
  .order-container(ref="scrollUpdate")
    v-row.icon-container(justify='center' align='center' v-if='loadType')
      semipolar-spinner(:animation-duration="1500"
                        :size="75"
                        :color="'#fd7363'")
    OrderCard1(v-else
              v-for='order in awaitOrders'
              type="await"
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
      console.log(response.data);
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setMyOrders', response.data.data);
          this.loadType = false;
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push({ name: 'auth' }),
          );
          break;
        case 'NotExist':
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
