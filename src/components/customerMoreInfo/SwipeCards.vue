<template lang="pug">
  swipe-list(
    ref="list"
    :items="respondedList"
    item-key="_id"
  )
    template(v-slot="{ item, index, revealRight }")
      .user-wrp(@click="itemClick(index)")
        user-card(:idUser="item.idUserResponse" :cost="item.cost")

    template(v-slot:right="{ item }")
      v-row.chat-action.action(align="center" justify="center" @click="goChat(item.idUserResponse)")
        v-icon(color="#56d68b" ) chat

      v-row.agree-action.action(
        align="center"
        justify="center"
        @click="agreeResponse(item._id, item.idUserResponse)")

        v-icon(color="#FFFFFF"  ) check
</template>

<script>
import axios from 'axios';
import { SwipeList, SwipeOut } from 'vue-swipe-actions';
import 'vue-swipe-actions/dist/vue-swipe-actions.css';
import UserCard from './UserCard.vue';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'swipe-cards',
  components: {
    UserCard,
    SwipeList,
    SwipeOut,
  },
  methods: {
    itemClick(index) {
      console.log(this.$refs.list);
      this.$refs.list.closeActions();
      this.$refs.list.revealRight(index);
    },

    goChat(id) {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('setIdUserRequest', id);
      this.$router.push({ name: 'chat' });
    },

    agreeResponse(idResponse, idUserResponse) {
      axios
        .post(`${this.$baseUrl}api/v1/private/process`, {
          method: 'add',
          submethod: 'customer',
          token: this.token,
          idResponse,
        })
        .then((response) => (this.checkAgreeResponse(response, idUserResponse)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAcceptOrder'),
            true,
            false,
          );
          logger.log(error);
        });
    },

    checkAgreeResponse(response, idUserResponse) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setType', 'process');
          // eslint-disable-next-line no-case-declarations
          const newOrder = { ...this.order };
          newOrder.idUserExecutor = idUserResponse;
          this.$store.dispatch('setMyOrder', newOrder);
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
            dialogMessages.getBody('errorAcceptOrder'),
            true,
            false,
          );
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
};
</script>

<style lang="stylus" scoped>
  .row {
    margin 0
  }

  .action {
    width 56px
  }

  .agree-action {
    background-color #56d68b
    border-radius 0 4px 4px 0
  }
</style>
