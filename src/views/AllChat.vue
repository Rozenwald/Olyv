<template lang="pug">
v-container.orderContainerHeight
    .order-container(ref="scrollUpdate")
      v-row.icon-container(justify='center' align='center' v-if="loadType ==='icon'")
        semipolar-spinner(:animation-duration="1500"
                          :size="75"
                          :color="'#fd7363'")
      v-row.text-container(justify='center'
                         align='center'
                         v-else-if="loadType === 'text'")
        .errorText-container
          span.errorText-container {{textForUser1}} <br/>
          span.errorText-container {{textForUser2}}
      lastMsgDialog(v-else-if="loadType === 'order'"
                v-for='item in messages'
                :key='item._id'
                :item='item')
</template>

<script>
import axios from 'axios';
import { SemipolarSpinner } from 'epic-spinners';
import store from '../store';
import lastMsgDialog from '../components/LastMsgDialog.vue';
import dialog from '../scripts/openDialog';
import dialogMessages from '../scripts/dialogMessages';
import logger from '../scripts/logger';

export default {
  name: 'allChat',
  components: {
    dialogMessages,
    lastMsgDialog,
    axios,
    store,
    SemipolarSpinner,
  },
  data() {
    return {
      loadType: 'icon',
      textForUser1: '',
      textForUser2: '',
      show: false,
      messages: [],
    };
  },
  methods: {
    route(name) {
      this.$router.push({ name });
    },
    getMessages() {
      axios
        .post(`${this.$baseChatUrl}api/v1/private/dialog`, {
          token: this.chatToken,
          method: 'receive',
        })
        .then((response) => (this.checkGetMessages(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialog.open('Ошибка', 'Не удалось получить сообщения', true);
          logger.log(error);
        });
    },
    checkGetMessages(response) {
      switch (response.data.status) {
        case 'success':
          response.data.data.forEach((element) => {
            this.messages.push(element);
          });
          this.loadType = 'order';
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
        case 'notExist':
          this.textForUser1 = 'Вы пока не начали ни один диалог';
          this.loadType = 'text';
          break;
        default:
          dialog.open('Ошибка', '', true, false);
          break;
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    chatToken() {
      return this.$store.getters.getChatToken;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Чаты');
    this.getMessages();
  },
};
</script>

<style lang="stylus" scoped>
  .orderContainerHeight {
    width 100%
    padding-top 48px
    padding-right 0px
    padding-left 0px
  }
  .order-container{
    width 100%
    padding 0
  }
  .text-container{
    position absolute
    bottom 50vh
    width 100%
    margin 0
    font-style normal
    font-weight bold
    font-size 18px
  }
  .icon-container{
    position absolute
    bottom 50vh
    width 100%
    margin 0
  }
  .chips-wrp {
    top 48px
    position fixed
    width 100%
    z-index 2
    left 0
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.1),
                0px 1px 1px 0px rgba(0, 0, 0, 0.11),
                0px 1px 3px 0px rgba(0, 0, 0, 0.01) !important;
  }
</style>
