<template lang="pug">
  v-container
    .message(v-for="item in messages" :key="item._id")
      right-msg(v-if="item.idUserResponse == user._id" :msg="item")
      left-msg(v-else :msg="item")
    v-row.container-message(align='center' justify='space-between')
      v-text-field.send-message.ma-0(
            v-model="msg"
            solo
            flat
            hide-details
            placeholder='Сообщение'
            :append="msg ? '$vuetify.icons.sendMsg' : '$vuetify.icons.rubl'"
            @click:append="checkNullMsg")
        template(slot="append")
          v-icon(v-show="msgNull")="$vuetify.icons.sendMsg"
          v-icon(v-show="!MsgNull" @click="checkNullMsg")="$vuetify.icons.sendMsg"
        template(slot="prepend-inner")
          v-icon="$vuetify.icons.rubl"
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

      if (this.msg.trim().length !== 0) {
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
      switch (response.data.status) {
        case 'success':
          this.messages = response.data.data;
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
    this.$store.commit('setTitle', 'Чат');
    this.handler();
    this.getMessages();
  },
};
</script>

<style lang="stylus" scoped>
  .v-input__control.v-text-field__details{
    display: none !important;
  }
  .message {
    margin 5px 0
  }

  .message:first-child {
    margin-top 0
  }
  .iconContainer{
    width 10%
    background-color #FFF
  }
  .send-icon{
    background-color #FFF
  }
  .text-field-details{
    min-height 0px
    height 0px
  }
  .container-message{
    width 100%
    position: fixed;
    bottom 0;
    left 0;
  }
  .send-message{
  }
  .RegNumber{
    margin-top 10px
    padding-right 10px
    padding-left 10px
  }
  .container {
    width 100%
    height auto
  }
  .name {
    font-style normal
    font-weight 500
    font-size 15px
    line-height 18px
    color #000000
  }

  .customer-more-info-header{
    padding 0 !important
  }

  .row {
    margin 0
  }
</style>
