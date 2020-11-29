<template lang="pug">
  .process-order-list
    OrderCard1(
      v-for='order in processOrders'
      type="await"
      :key='order.id'
      :item='order'
    )
</template>

<script>
import OrderCard1 from '../../views/OrderCard1.vue';

export default {
  name: 'await-orders',
  components: {
    OrderCard1,
  },
  computed: {
    processOrders() {
      return this.$store.getters.getMyProcessOrders;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .process-order-list:first-child {
    margin-top 0
  }

  .process-order-list {
    margin-top: 48px
  }
</style>
