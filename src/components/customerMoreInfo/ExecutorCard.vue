<template lang="pug">
  v-sheet.sheet(elevation="3" rounded)
    v-row.sheet-title(align="center" justify="center") Ваш заказ выполняет

    v-row.sheet-content(align="center" justify="center")
      v-list-item
        v-list-item-avatar
          avatar(:src="photo")
        v-list-item-content
          v-list-item-title {{executorData.name}} {{executorData.lastname}}
          v-list-item-subtitle
            v-rating(
              :length="5"
              readonly
              :half-increments="true"
              dense
              color="#FFCA10"
              background-color="#FFCA10"
              size="14")

    v-row.sheet-btns(align="center" justify="center")
      v-btn.sheet-btns-chat-btn(rounded @click="goChat") Чат
</template>

<script>
import axios from 'axios';
import Avatar from '../Avatar.vue';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'executor-card',
  components: {
    Avatar,
  },
  data() {
    return {
      executorData: {},
    };
  },
  methods: {
    goChat() {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('setIdUserRequest', this.order.idUserExecutor);
      this.$router.push('chat');
    },

    getExecutorData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'id',
          token: this.token,
          id: this.order.idUserExecutor,
        })
        .then((response) => (this.checkExecutorData(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          logger.log(error);
        });
    },

    checkExecutorData(response) {
      switch (response.data.status) {
        case 'success':
          this.executorData = response.data.data;
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
    token() {
      return this.$store.getters.getToken;
    },

    order() {
      return this.$store.getters.getMyOrder;
    },

    photo() {
      if (!this.executorData.photo) {
        return ' ';
      }

      if (!this.executorData.photo.length) {
        return null;
      }
      const url = this.executorData.photo[this.executorData.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
    },
  },
  created() {
    this.getExecutorData();
  },
};
</script>

<style lang="stylus" scoped>
  .sheet {
    padding 12px
    position fixed
    width 100%
    bottom 0
    left 0
    z-index 5

    .row {
      margin 0
    }

    .v-list-item {
      flex none
      padding 0

      &__content {
        display block
      }

      &__title {
        text-align center
      }

      &__subtitle {
        text-align center
      }
    }

    &-title {
      font-weight 400
      font-size 1.25rem
      letter-spacing .0125em
    }

    &-btns {
      margin-top 12px !important
      margin-bottom 6px !important

      &-chat-btn {
        width 70%
        background none !important
        color #56D68B
        border 1px solid #56D68B
        font-size 13px
        box-shadow none !important
      }
    }
  }
</style>
