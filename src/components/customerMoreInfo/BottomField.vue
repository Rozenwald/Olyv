<template lang="pug">
  v-sheet.bottom-field(elevation="3" rounded)
    v-row.bottom-field-btns-wrp
      v-col(cols="6" align="center")
        v-btn.bottom-field-btns-wrp-delete(rounded @click="delOrder") Удалить
      v-col(cols="6" align="center")
        v-btn.bottom-field-btns-wrp-edit(rounded @click="editOrder") Редактировать
</template>

<script>
import axios from 'axios';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'bottom-field',
  methods: {
    delOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'del',
          // eslint-disable-next-line no-underscore-dangle
          id: this.order._id,
        })
        .then((response) => (this.checkResponse(response)))
        .catch((error) => {
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorDeleteOrder'),
            true,
            false,
          );
          logger.log(error);
        });
      /* eslint-enable no-return-assign */
    },

    editOrder() {
      this.$store.dispatch('setAll', this.order);
      this.$store.dispatch('isEdit', true);
      this.$store.dispatch('setMainSheetStatus', true);
    },

    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.$router.back();
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
            dialogMessages.getBody('errorDeleteOrder'),
            true,
            false,
          );
          break;
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },

    order() {
      return this.$store.getters.getMyOrder;
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

    .col {
      padding 6px
    }

    &-btns-wrp {
      &-delete {
        background none !important
        color #56D68B
        border 1px solid #56D68B
        max-width 100%
        font-size 12px
        width 100%
        box-shadow none !important
      }

      &-edit {
        background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
        color #FFFFFF
        font-size 12px
        max-width 100%
        width 100%
        box-shadow none !important
      }
    }
  }
</style>
