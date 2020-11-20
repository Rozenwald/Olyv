<template lang="pug">
  v-sheet.address-field(elevation="1" rounded)
    v-row(align="center")
      v-row.address-field-address(align="center") {{order.address}}

      v-row.address-field-btn(align="center" justify="end" @click="fullscreenMap")
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
    order() {
      return this.$store.getters.getMyOrder;
    },
  },
};
</script>

<style lang="stylus" scoped>
.address-field {
  padding 12px

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
