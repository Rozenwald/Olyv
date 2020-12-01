<template lang="pug">
  v-bottom-sheet.my-cost-sheet-wrp(v-model="open")
    v-sheet.my-cost-sheet-wrp-sheet
      .my-cost-sheet-wrp-sheet-title
        v-row(
          align='center'
          justify='center') Предложите свою цену

      v-divider

      v-text-field.my-cost-sheet-wrp-sheet-cost-field(
        solo
        hide-details
        suffix="Руб"
        type="number"
        v-model="cost"
        ref="costInput")

      v-row.my-cost-sheet-wrp-sheet-btn-wrp(align="center" justify="center")
        v-btn(rounded @click="acceptOrder") Отозваться
</template>

<script>
import axios from 'axios';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'my-cost-sheet',
  data() {
    return {
      cost: null,
    };
  },
  methods: {
    acceptOrder() {
      /* eslint-disable no-underscore-dangle */
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'add',
          submethod: 'executor',
          idOrder: this.order._id,
          cost: this.cost || undefined,
        })
        .then((response) => (this.checkOrderResponse(response)))
        .catch((error) => {
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorCreateResponse'),
            true,
            false,
          );
          logger.log(error);
        });
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
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorCreateResponse'),
            true,
            false,
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
      this.open = false;
    },

    buttonBack(e) {
      e.preventDefault();
      this.open = false;
    },
  },
  computed: {
    open: {
      get() {
        return this.$store.getters.getMyCostSheetStatus;
      },
      set(status) {
        this.$store.dispatch('setMyCostSheetStatus', status);
      },
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
  },
  created() {
    document.addEventListener('backbutton', this.buttonBack, false);
  },
  beforeDestroy() {
    this.$refs.costInput.blur();
    document.removeEventListener('backbutton', this.buttonBack, false);
  },
};
</script>

<style lang="stylus" scoped>
  .my-cost-sheet-wrp {
    .row {
      margin 0
    }

    &-sheet {
      border-radius 10px 10px 0 0

      &-title {
        height 48px

        .row {
          height 48px
        }
      }

      &-cost-field {
        margin-top 15px
      }

      &-btn-wrp {

        padding 15px 0

        .v-btn {
          background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
          color #FFFFFF
          font-size 13px
          max-width 70%
          width 70%
          box-shadow none !important
        }
      }
    }
  }
</style>
