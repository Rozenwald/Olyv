<template lang="pug">
  v-sheet.address-field(elevation="1" rounded)
    v-row(align="center")
      v-row.address-field-address(align="center") {{order.address}}

      v-row.address-field-btn(align="center" justify="center" @click="fullscreenMap")
        span.address-field-map-text На карте

    .map-wrp
      map-view(:lat="order.latitude" :lon="order.longitude")
</template>

<script>
import MapView from '../MapView.vue';

export default {
  name: 'address-field',
  components: {
    MapView,
  },
  data() {
    return {
      fullscreen: null,
    };
  },
  methods: {
    fullscreenMap() {
      this.$store.dispatch('fullscreen', true);
    },
  },
  computed: {
    orderType() {
      return this.$store.getters.getOrderType;
    },
    order() {
      if (this.orderType !== 'endedExecutor') {
        return this.$store.getters.getMyOrder;
      }
      return this.$store.getters.getMyFeedbackOrder.order;
    },
  },
};
</script>

<style lang="stylus" scoped>
.address-field {
  padding-top 12px
  padding-left 12px
  padding-bottom 12px

  .row {
    margin 0
  }

  &-address {
    width 80%
    max-width 80%
    padding-right 12px
  }

  &-btn {
    width 20%
    max-width 20%
    border-left 1px solid #777777
  }

  &-divider {
    margin-right 6px
    height 48px
    min-height 48px
    z-index 10
  }

  &-map-text {
    padding 4px 0;
    font-size 12px
    text-align center
  }
}
</style>
