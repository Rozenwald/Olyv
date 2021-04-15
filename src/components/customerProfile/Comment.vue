<template lang="pug">
  v-card.comment
    v-list-item(dense)
      avatar.avatar(color="#56D68B" :src="photo")
      v-list-item-content
        v-list-item-title {{user.name}} {{user.lastname}}
      v-list-item-action
        v-row.rating-wrp(v-if="item.rating" align='center' justify='center')
          v-rating.rating-wrp-star(
            :length="5"
            readonly
            :half-increments="true"
            :dense="true"
            color="#FFCA10"
            background-color="#FFCA10"
            :value="item.rating"
            size="10"
          )
          span.rating-text ({{item.rating}})
    v-card-text.comment-text {{item.comment}}
</template>

<script>
import axios from 'axios';
import Avatar from '../Avatar.vue';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'comment',
  props: {
    type: String,
    item: Object,
  },
  components: {
    Avatar,
  },
  data() {
    return {
      user: {},
      userCard: {},
    };
  },
  methods: {
    async init() {
      this.$store.commit('setTitle', 'Профиль');

      let response = await this.getUserData(this.item.from);
      this.user = this.checkResponse(response) || {};

      this.idUserCard = this.user.idUserCard;
      response = await this.getUserCardData(this.idUserCard);
      this.userCard = this.checkResponse(response) || { _id: '123' };
    },

    async getUserData(id) {
      const body = {
        method: 'receive',
        submethod: 'id',
        token: this.token,
        id,
      };

      try {
        return await axios.post(`${this.$baseUrl}api/v1/private/user`, body);
      } catch (error) {
        logger.log(error);
      }

      return null;
    },
    async getUserCardData(idUserCard) {
      const body = {
        method: 'receive',
        submethod: 'byId',
        token: this.token,
        idUserCard,
      };
      try {
        return await axios.post(`${this.$baseUrl}api/v1/private/userCard`, body);
      } catch (error) {
        logger.log(error);
      }
      return null;
    },

    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          return response.data.data;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            false,
          );
          break;
        case 'notExist':
          return null;
        default:
          logger.log(response);
          break;
      }
      return null;
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    photo() {
      if (!this.user) {
        return '';
      }
      if (!this.user.photo) {
        return '';
      }
      if (!this.user.photo.length) {
        return null;
      }
      const url = this.user.photo[this.user.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="stylus" scoped>
  .v-card {
    width 100%
    background-color inherit
    box-shadow none !important
    margin-top 15px
  }
  .rating-text {
    margin-left 10px
  }
  .comment-text {
    margin-top 5px
    margin-left 5px
    margin-right 5px
  }
  .avatar {
    margin-right 16px
    margin-bottom 8px
    margin-top 8px
  }

  .v-list-item {
    padding 0
  }

  .v-card__text {
    padding 0
  }

  .rating-wrp {
    margin 0
    font-size 12px
    line-height 1;
  }
  .rating-wrp {
    margin 0
    font-size 12px
    line-height 1;
  }

  .v-list-item__title {
    font-weight bold
    font-size 14px
  }
</style>
