<template lang="pug">
  v-sheet.user-field(@click="goChat()")
    v-list-item
      v-list-item-avatar(size="62")
        avatar(type="public" size="62" :src="photo")
      v-list-item-content.content
        v-list-item-title {{name}}
        v-list-item-subtitle {{item.message.text}}
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Avatar from './Avatar.vue';
import SvgIcon from './SvgIcon.vue';
import logger from '../scripts/logger';
import dialog from '../scripts/openDialog';
import dialogMessages from '../scripts/dialogMessages';

export default {
  name: 'LastMsgDialog',
  components: {
    SvgIcon,
    Avatar,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      text: 'Ошибка: текст не опознан',
      user: null,
    };
  },
  methods: {
    goChat() {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('setIdUserRequest', this.item.idUserRequest);
      this.$router.push('chat');
    },
    getUserCustomer() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          token: this.token,
          method: 'receive',
          submethod: 'my',
        })
        .then((response) => (this.checkGetUser(response)))
      // eslint-disable-next-line no-return-assign
        .catch((error) => {
          logger.log(error);
        });
    },
    getUserExecutor() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          token: this.token,
          method: 'receive',
          submethod: 'id',
          id: this.item.idUserRequest,
        })
        .then((response) => (this.checkGetUser(response)))
      // eslint-disable-next-line no-return-assign
        .catch((error) => {
          logger.log(error);
        });
    },
    checkGetUser(response) {
      console.log(response.data.data);
      switch (response.data.status) {
        case 'success':
          this.user = response.data.data;
          console.log(this.user);
          break;
        case 'notExist':
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
            dialogMessages.getBody('errorPhoto'),
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
    name() {
      if (this.user.name == null) {
        return this.user.email;
      }
      return `${this.user.name} ${this.user.lastname || ''}`;
    },
    photo() {
      if (!this.user) {
        return ' ';
      }
      if (!this.user.photo) {
        return ' ';
      }
      if (!this.user.photo.length) {
        return null;
      }
      const url = this.user.photo[this.user.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
    },
    time() {
      return moment(this.item.createDate);
    },
    formatedTime() {
      if (this.time.isAfter(moment().subtract(1, 'days'))) {
        return this.time.calendar();
      }
      return this.time.format('D MMMM, HH:mm');
    },
  },
  created() {
    this.getUserExecutor();
    moment.locale('RU');
  },
};
</script>

<style lang="stylus" scoped>
  .user-field {
    width 100%
    border-top 1px solid #e7e8ec !important
  }

  .row{
    margin 0
  }

  .main-part{
    margin-bottom 10px
  }

  .description {
    overflow hidden
    text-overflow ellipsis
    line-height 1.2
    min-height 57.6px
    display -webkit-box
    -webkit-line-clamp 3
    -webkit-box-orient vertical
    margin-right 5px
  }

  .cost-wrp {
    margin 0
    height 36px
    max-width 100px
    background #FEF5EE
    border-radius 10px 0px 0px 10px
  }
  .more-info-wrp {
    text-align center
    font-style normal
    font-size 10px
    line-height 1.4
    color #65686C
  }
  .more-info-wrp svg {
    margin-right 5px
  }
</style>
