<template lang="pug">
  v-sheet.address-field(elevation="1" rounded)
    v-row(align="center")
      v-row.address-field-address(align="center") {{order.address}}
      .address-field-divider-wrp
        v-divider.address-field-divider(vertical)
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
    order() {
      return this.$store.getters.getMyOrder;
    },
  },
};
</script>

<style lang="stylus" scoped>
.address-field {
  height 48px
  padding 0 0 0 12px

  .row {
    margin 0
    height 48px
  }

  &-address {
    width 79%
    max-width 79%
  }

  &-btn {
    width 20%
    max-width 20%
  }

  &-divider {
    height 30px !important
    max-height 30px !important
  }

  &-map-text {
    padding 4px 0;
    font-size 12px
  }
}
</style>
