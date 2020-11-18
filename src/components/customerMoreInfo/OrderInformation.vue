<template lang="pug">
  v-sheet.about-order(elevation="1" rounded)
    v-row.about-order-title.font-weight-medium() Информация о заказе
    .about-order-content
      v-row.about-order-content-cost
        span.about-order-content-title Цена:
        v-row.about-order-content-main {{formatedCost}}
      v-row.about-order-content-address
        span.about-order-content-title Адрес:
        v-row.about-order-content-main {{order.address}}
      v-row.about-order-content-description
        span.about-order-content-title Описание:
        v-row.about-order-content-main {{order.description}}
      v-row.about-order-content-status
        span.about-order-content-title Статус:
        v-row.about-order-content-main(
          :style="{color: statusColor}"
        ) {{formatedOrderType}}
</template>

<script>
export default {
  name: 'order-information',
  computed: {
    order() {
      return this.$store.getters.getMyOrder;
    },

    orderType() {
      return this.$store.getters.getOrderType;
    },

    formatedOrderType() {
      switch (this.orderType) {
        case 'await':
          return 'Ожидание';
        case 'process':
          return 'В процессе';
        default:
          return '';
      }
    },

    statusColor() {
      switch (this.orderType) {
        case 'await':
          return '#FBC02D';
        case 'process':
          return '#FE7664';
        default:
          return 'inherit';
      }
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
      &-title {
        color rgba(0,0,0,.6) !important;
        margin-right 10px
      }
    }
  }
</style>
