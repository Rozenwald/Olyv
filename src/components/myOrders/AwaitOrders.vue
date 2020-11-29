<template lang="pug">
  .await-order-list
    OrderCard1(
      v-for='order in awaitOrders'
      type="await"
      :key='order.id'
      :item='order'
    )
</template>

<script>
import logger from '../../scripts/logger';
import OrderCard1 from '../../views/OrderCard1.vue';

export default {
  name: 'await-orders',
  components: {
    OrderCard1,
  },
  computed: {
    awaitOrders() {
      return this.$store.getters.getMyOrders;
    },
  },
  created() {
    logger.log('sasa');
    logger.log(this.awaitOrders);
  },
};
</script>

<style lang="stylus" scoped>
  .await-order-list:first-child {
   margin-top 0
  }

 .await-order-list {
   margin-top: 48px
 }
</style>
