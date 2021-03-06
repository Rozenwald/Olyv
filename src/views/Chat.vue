<template lang="pug">
  v-container(ref="container")
    .message(v-for="item in messages" :key="item._id")
      right-msg(v-if="item.from == 'response'" :msg="item" :show="item.show")
      left-msg(v-else :msg="item")

    .text-message-wrp(align='center')
      v-textarea.text-message.ma-0(
          v-model="msg"
          solo
          flat
          hide-details
          placeholder='Сообщение'
          @click:append="checkNullMsg"
          rows="1"
          auto-grow)
        template(slot="append")
          .text-input-icon(@click="checkNullMsg")
            svg-icon(name="SendMsg")
    ErrorChatDialog
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
import LeftMsg from '../components/LeftMsg.vue';
import RightMsg from '../components/RightMsg.vue';
import ErrorChatDialog from '../components/ErrorChatDialog.vue';
import dialog from '../scripts/openDialog';
import dialogMessages from '../scripts/dialogMessages';
import logger from '../scripts/logger';

export default {
  name: 'Chat',
  components: {
    SvgIcon,
    axios,
    LeftMsg,
    RightMsg,
    ErrorChatDialog,
  },
  data() {
    return {
      show: false,
      errorMsg: null,
      messages: null,
      msg: null,
    };
  },
  methods: {
    // получения данных о отозвавшемся пользователе
    getUserData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'id',
          token: this.token,
          id: this.idUserRequest,
        })
        .then((response) => (this.checkUserData(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialog.open('Ошибка', '', true);
          logger.log(error);
        });
    },
    // установка имени в тулбар
    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.commit('setUserRequest', response.data.data);
          if (response.data.data.name) {
            this.$store.commit('setTitle', `${response.data.data.name} ${response.data.data.lastname}`);
          } else {
            this.$store.commit('setTitle', response.data.data.email);
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
          this.$store.commit('setTitle', 'Чат');
          dialog.open('Ошибка', '', true, false);
          break;
      }
    },

    // Получение сообщений из vuex (костыль)
    getMessagesFromVuex() {
      this.messages = this.$store.state.chat.messages[this.idUserRequest];
    },

    // получение сообщений
    getMessages() {
      axios
        .post(`${this.$baseChatUrl}api/v1/private/message`, {
          token: this.chatToken,
          method: 'receive',
          submethod: 'chat',
          idUserRequest: this.idUserRequest,
          status: 'completed',
        })
        .then((response) => (this.checkGetMessages(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialog.open('Ошибка', 'Не удалось получить сообщения', true);
          logger.log(error);
        });
    },

    // Проверка получения сообщений
    checkGetMessages(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setAllMessages', {
            id: this.idUserRequest,
            messages: response.data.data,
          });
          this.getMessagesFromVuex();
          this.scrollMsgDown();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'notExist':
          this.$store.dispatch('setAllMessages', {
            messages: [],
            id: this.idUserRequest,
          });
          this.getMessagesFromVuex();
          console.log(this.messages);
          break;
        default:
          dialog.open('Ошибка', '', true, false);
          break;
      }
    },

    // подписка на лонгпул
    handler() {
      axios
        .get(this.url)
        .then((response) => (this.handlerCheck(response)))
        .catch((error) => (this.errorCheck(error)));
    },
    handlerCheck(response) {
      if (this.messages) {
        this.$store.dispatch('setMessage', {
          id: response.data.idUserRequest,
          message: response.data,
        });
      } else {
        this.$store.dispatch('setAllMessages', {
          id: response.data.idUserRequest,
          messages: [response.data],
        });
      }
      this.getMessagesFromVuex();
      this.handler(this.url);
    },
    errorCheck(error) {
      logger.log(error);
      setTimeout(this.handler(this.url), 5000);
    },
    // проверка на пустое сообщение
    checkNullMsg() {
      if (this.msg == null) {
        return undefined;
      }
      this.msg = this.msg.trim();
      if (this.msg.length !== 0) {
        this.sendBeforeMessage();
      }
      return undefined;
    },
    // отправка сообщения на клиент до отправки на сервер
    sendBeforeMessage() {
      const date = new Date();
      console.log(this.messages.length);
      this.message = {
        element: this.messages.length,
        text: this.msg,
        show: this.show,
        ofCreateDate: date,
        from: 'response',
      };
      console.log(this.message.element);
      this.msg = null;
      this.$store.dispatch('setMessage', {
        id: this.idUserRequest,
        message: this.message,
      });
      this.sendMessage();
      this.scrollMsgDown();
    },
    // отправка сообщения и скролл вниз экрана
    sendMessage() {
      axios
        .post(`${this.$baseChatUrl}api/v1/private/message`, {
          token: this.chatToken,
          method: 'add',
          text: this.message.text,
          idUserRequest: this.idUserRequest,
        })
        .then((response) => (this.checkAddMessage(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.errorIcon()));
    },

    errorIcon() {
      this.message.show = true;
      this.$store.dispatch('setErrorShow', this.message);
    },

    // Скролл в самый низ экрана
    scrollMsgDown() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    },
    // Проверка отправилось ли сообщение на сервер
    checkAddMessage(response) {
      console.log(response.data);
      this.msg = null;
      switch (response.data.status) {
        case 'success':
          if (this.messages == null) {
            this.$store.dispatch('setAllMessages', {
              id: this.idUserRequest,
              messages: [response.data.data],
            });
          }
          break;
        case 'notAuthenticate':
          this.errorIcon();
          break;
        case 'notExist':
          this.errorIcon();
          break;
        default:
          this.errorIcon();
          dialog.open('Ошибка', '', true, false);
          break;
      }
    },
    // Получение доп.отрезка сообщений
    getMoreMessages() {
      const lastDate = this.messages[0].ofCreateDate;
      const date = new Date(lastDate).getTime() - 1000;
      axios
        .post(`${this.$baseChatUrl}api/v1/private/message`, {
          token: this.chatToken,
          method: 'receive',
          submethod: 'chat',
          idUserRequest: this.idUserRequest,
          status: 'completed',
          date,
        })
        .then((response) => (this.checkMoreMessages(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialog.open('Ошибка', '', true);
          logger.log(error);
        });
    },

    // Проверка получения доп.сообщений
    checkMoreMessages(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setMoreMessages', {
            id: this.idUserRequest,
            messages: response.data.data,
          });
          this.getMessagesFromVuex();
          window.onscroll = () => {
            if (window.pageYOffset <= 300) {
              this.getMoreMessages();
              window.onscroll = null;
            }
          };
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'notExist':
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
    idChanal() {
      return this.$store.getters.getIdChanal;
    },
    chatToken() {
      return this.$store.getters.getChatToken;
    },
    url() {
      return `${this.$baseChatUrl}api/v1/private/chat/e2e${this.idChanal}/?token=${this.chatToken}`;
    },
    idUserRequest() {
      return this.$store.getters.getIdUserRequest;
    },
    user() {
      return this.$store.getters.getUser;
    },
    test() {
      return this.$store.state.chat.messages;
    },
  },
  watch: {
    token() {
      if (this.token) {
        this.getUserData();
        this.getMessagesFromVuex();
        this.getMessages();
        this.handler();
      }
    },
  },
  mounted() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', false);
    window.onscroll = () => {
      if (window.pageYOffset <= 300 && this.token) {
        this.getMoreMessages();
        window.onscroll = null;
      }
    };
  },
  beforeDestroy() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', true);
  },
  created() {
    if (this.token) {
      this.getUserData();
      this.getMessagesFromVuex();
      this.getMessages();
      this.handler();
    }
  },
};
</script>

<style lang="stylus" scoped>
  .message {
    margwin 5px 0
  }
  .container {
    overflow scroll;
  }
  .message:first-child {
    margin-top 0
  }
  .text-message-wrp {
    width 100%
    position: fixed;
    bottom 0;
    left 0;
  }
  .text-message {
    max-height 168px + 10px
    overflow scroll
  }
  .row {
    margin 0
  }

</style>
