<template lang="pug">
  v-sheet.about-order(elevation="1" rounded)
    v-row.about-order-title.font-weight-medium() Информация о заказе
    .about-order-content
      v-row.about-order-content-cost
        span.about-order-content-cost-title Цена:
        v-row.about-order-content-cost-content {{formatedCost}}
      v-row.about-order-content-address
        span.about-order-content-cost-title Адрес:
        v-row.about-order-content-cost-content {{order.address}}
      v-row.about-order-content-description
        span.about-order-content-cost-title Описание:
        v-row.about-order-content-cost-content {{order.description}}
</template>

<script>
export default {
  name: 'order-information',
  computed: {
    order() {
      return this.$store.getters.getMyOrder;
    },

    formatedCost() {
      const price = Number.prototype.toFixed.call(parseFloat(this.order.cost || 0) || 0);
      let priceSep = price.replace(/(\D)/g, ',');
      priceSep = priceSep.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

      return `${priceSep} руб.`;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .about-order {
    padding 12px

    .row {
      margin 0
    }

    &-title {
      margin-bottom 5px !important
    }

    &-content {
      &-cost-title, &-address-title, &-description-title {
        color rgba(0,0,0,.6) !important;
        margin-right 10px
      }
    }
  }
</style>
