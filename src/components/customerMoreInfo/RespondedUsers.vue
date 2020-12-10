<template lang="pug">
  v-sheet.responded-user(elevation="1" rounded)
    v-row.responded-user-title.font-weight-medium() Отозвались ({{respondedList.length || 0}})
    swipe-cards
</template>

<script>
import axios from 'axios';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';
import SwipeCards from './SwipeCards.vue';

export default {
  name: 'responded-users',
  components: {
    SwipeCards,
  },
  methods: {
    getOrderResponse() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'receive',
          submethod: 'customer',
          // eslint-disable-next-line no-underscore-dangle
          idOrder: this.order._id,
        })
        .then((response) => (this.checkOrderResponse(response)))
        .catch((error) => {
          logger.log(error);
        });
      /* eslint-enable no-return-assign */
    },

    checkOrderResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setRespondedList', response.data.data);
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
          logger.log(response);
          break;
      }
    },
  },
  computed: {
    respondedList() {
      return this.$store.getters.getRespondedList || [];
    },
    token() {
      return this.$store.getters.getToken;
    },

    order() {
      return this.$store.getters.getMyOrder;
    },
  },
  watch: {
    respondedList() {
      if (!this.respondedList.length) {
        this.getOrderResponse();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .responded-user {
    padding 12px 0

    .row {
      margin 0
    }

    &-title {
      margin-bottom 5px !important
      margin-left 12px !important
    }
  }
</style>
