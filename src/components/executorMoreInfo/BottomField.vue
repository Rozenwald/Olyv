<template lang="pug">
  v-sheet.bottom-field(elevation="3" rounded)
    v-row.bottom-field-cost-wrp(align="center" justify="center")
      .bottom-field-text-cost Заказчик предложил
      .bottom-field-cost {{formatedCost}}
    v-row.bottom-field-btns-wrp
      v-row(cols="6" align="center" justify="center")
        v-btn.bottom-field-btns-wrp-accept-my-cost(rounded
          :loading='loading'
          :disabled='loading'
          @click="clickLeftBtn") {{leftBtnText}}
      v-row(cols="6" align="center" justify="center")
        v-btn.bottom-field-btns-wrp-accept(rounded
          :loading='loading'
          :disabled='loading'
          @click="clickRightBtn") {{rightBtnText}}
</template>

<script>
import axios from 'axios';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'bottom-field',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    acceptOrder() {
      this.loading = true;
      /* eslint-disable no-underscore-dangle */
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'add',
          submethod: 'executor',
          idOrder: this.order._id,
          cost: this.order.cost,
        })
        .then((response) => (this.checkOrderResponse(response)))
        .catch((error) => {
          dialog.open('Ошибка', '', true);
          logger.log(error);
          this.loading = false;
        });
      this.loading = false;
      /* eslint-enable no-underscore-dangle */
    },
    acceptOrderMyCost() {
      this.$store.dispatch('setMyCostSheetStatus', true);
    },
    cancelOrder() {
      this.loading = true;
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'del',
          submethod: 'executor',
          id: this.order.idResponse,
        })
        .then((response) => (this.checkOrderResponse(response)))
        .catch((error) => {
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorDeleteResponse'),
            true,
            false,
          );
          logger.log(error);
          this.loading = false;
        });
      this.loading = false;
      /* eslint-enable no-return-assign */
    },
    completeOrder() {
      this.loading = true;
      /* eslint-disable no-underscore-dangle */
      axios
        .post(`${this.$baseUrl}api/v1/private/process`, {
          token: this.token,
          method: 'completed',
          submethod: 'executor',
          idResponse: this.order.idResponse,
        })
        .then((response) => (this.checkOrderResponse(response)))
        .catch((error) => {
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorCompletedOrder'),
            true,
            false,
          );
          logger.log(error);
          this.loading = false;
        });
      this.loading = false;
      /* eslint-enable no-underscore-dangle */
    },
    checkOrderResponse(response) {
      switch (response.data.status) {
        case 'success':
          if (this.orderType === ('all' || 'keyword')) {
            this.$store.dispatch('setType', 'await');
          } else if (this.orderType === ('await' || 'process')) {
            this.$store.dispatch('setType', 'all');
          }

          if (this.orderType === 'process') {
            this.$router.back();
          }

          if (response.data.data) {
            const order = { ...this.order };
            // eslint-disable-next-line no-underscore-dangle
            order.idResponse = response.data.data._id;
            this.$store.dispatch('setMyOrder', order);
          }
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
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(response);
      }
    },

    goChat() {
      this.loading = true;
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('setIdUserRequest', this.order.idUserCustomer);
      this.$router.push('chat');
      this.loading = false;
    },

    clickRightBtn() {
      if (this.user.verification === 'completed') {
        switch (this.orderType) {
          case 'all':
            this.acceptOrder();
            break;
          case 'keyword':
            this.acceptOrder();
            break;
          case 'await':
            this.cancelOrder();
            break;
          case 'process':
            this.completeOrder();
            break;
          default:
            break;
        }
      } else {
        dialog.open(
          dialogMessages.getTitle('warning'),
          dialogMessages.getBody('needToVerification'),
          true,
          true,
          () => { this.$router.push({ name: 'verification' }); },
        );
      }
    },

    clickLeftBtn() {
      if (this.user.verification === 'completed') {
        switch (this.orderType) {
          case 'all':
            this.acceptOrderMyCost();
            break;
          case 'keyword':
            this.acceptOrderMyCost();
            break;
          case 'await':
            this.goChat();
            break;
          case 'process':
            this.goChat();
            break;
          default:
            break;
        }
      } else {
        dialog.open(
          dialogMessages.getTitle('warning'),
          dialogMessages.getBody('needToVerification'),
          true,
          true,
          () => { this.$router.push({ name: 'verification' }); },
        );
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    token() {
      return this.$store.getters.getToken;
    },

    orderType() {
      return this.$store.getters.getOrderType;
    },

    order() {
      return this.$store.getters.getMyOrder;
    },

    formatedCost() {
      const price = Number.prototype.toFixed.call(parseFloat(this.order.cost || 0) || 0);
      let priceSep = price.replace(/(\D)/g, ',');
      priceSep = priceSep.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

      return `${priceSep} руб.`;
    },

    rightBtnText() {
      switch (this.orderType) {
        case 'all':
          return 'Отозваться';
        case 'keyword':
          return 'Отозваться';
        case 'await':
          return 'Отменить';
        case 'process':
          return 'Завершить';
        default:
          return 'Отозваться';
      }
    },

    leftBtnText() {
      switch (this.orderType) {
        case 'all':
          return 'Своя цена';
        case 'keyword':
          return 'Своя цена';
        case 'await':
          return 'Чат';
        case 'process':
          return 'Чат';
        default:
          return 'Своя цена';
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.bottom-field {
  padding 12px
  position fixed
  width 100%
  bottom 0
  left 0
  z-index 5

  .row {
    margin 0
  }

  &-cost, &-text-cost  {
    width 100%
    text-align center
    font-size 16px
  }

  &-cost {
    color #FFA967
  }

  &-btns-wrp {
    margin-top 12px !important

    &-accept-my-cost {
      background none !important
      color #56D68B
      border 1px solid #56D68B
      max-width 90%
      font-size 13px
      width 90%
      box-shadow none !important
    }

    &-accept {
      background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
      color #FFFFFF
      font-size 13px
      max-width 90%
      width 90%
      box-shadow none !important
    }
  }
}
</style>
