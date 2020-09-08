<template lang="pug">
  v-container
    .message(v-for="item in messages" :key="item._id")
      right-msg(v-if="item.from == 'response'" :msg="item")
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

</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
import LeftMsg from '../components/LeftMsg.vue';
import RightMsg from '../components/RightMsg.vue';

export default {
  name: 'Chat',
  components: {
    SvgIcon,
    axios,
    LeftMsg,
    RightMsg,
  },
  data() {
    return {
      messages: [],
      error: '',
      msg: null,
    };
  },
  methods: {

    handler() {
      axios
        .get(this.url)
        .then((response) => (this.handlerCheck(response)))
        .catch((error) => (this.errorCheck(error)));
    },

    handlerCheck(response) {
      this.messages.push(response.data);
      this.handler(this.url);
    },

    errorCheck() {
      this.handler(this.url);
    },

    checkNullMsg() {
      if (this.msg == null) {
        return undefined;
      }

      this.msg = this.msg.trim();

      if (this.msg.length !== 0) {
        this.sendMessage();
      }

      return undefined;
    },

    sendMessage() {
      axios
        .post(`${this.$baseChatUrl}api/v1/private/message`, {
          token: this.chatToken,
          method: 'add',
          text: this.msg,
          idUserRequest: this.idUserRequest,
        })
        .then((response) => (this.checkAddMessage(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => (console.log(error)));
    },

    checkAddMessage(response) {
      switch (response.data.status) {
        case 'success':
          // eslint-disable-next-line no-underscore-dangle
          this.messages.push(response.data.data);
          this.msg = null;
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

    getMessages() {
      axios
        .post(`${this.$baseChatUrl}api/v1/private/message`, {
          token: this.chatToken,
          method: 'receive',
          submethod: 'chat',
          idUserRequest: this.idUserRequest,
          step: 0,
          status: 'completed',
        })
        .then((response) => (this.checkGetMessages(response)))
      // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'ошибка, Витя выжил'));
    },

    checkGetMessages(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.messages = response.data.data;
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'notExist':
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

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
        .catch(() => (this.error = 'Ошибка'));
    },

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
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
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
  },

  mounted() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', false);
  },
  beforeDestroy() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', true);
  },
  created() {
    this.getUserData();
    this.handler();
    this.getMessages();
  },
};
</script>

<style lang="stylus" scoped>
  .message {
    margin 5px 0
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
