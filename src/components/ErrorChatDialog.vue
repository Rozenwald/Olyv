<template lang="pug">

v-dialog(v-model="showDialog")
  v-list
    v-list-item-group
      v-list-item.button-dialog(@click='repeatSendMessage') Повторить отправку
      // v-list-item.button-dialog(@click='copyMessage') Скопировать
      // v-list-item.button-dialog(@click='editMessage') Редактировать
      v-list-item.button-dialog(@click='deleteMessage') Удалить
</template>

<script>
import axios from 'axios';

export default {
  name: 'error-chat-dialog',
  data() {
    return {
    };
  },
  methods: {
    repeatSendMessage() {
      console.log(this.msg);
      this.message = this.msg;
      this.$store.dispatch('showChatDialog', false);
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
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setErrorShow', false);
          break;
        case 'notAuthenticate':
          break;
        case 'notExist':
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    copyMessage() {
      this.$store.dispatch('showChatDialog', false);
    },
    editMessage() {
      this.$store.dispatch('showChatDialog', false);
    },
    deleteMessage() {
      this.$store.dispatch('showChatDialog', false);
      this.$store.dispatch('deleteMessage');
    },
  },
  computed: {
    showDialog() {
      return this.$store.getters.isVisibleChatDialog;
    },
    msg() {
      return this.$store.getters.getTextMessage;
    },
    chatToken() {
      return this.$store.getters.getChatToken;
    },
    idUserRequest() {
      return this.$store.getters.getIdUserRequest;
    },
  },
};
</script>
<style lang="stylus" scoped>
  .dialog-card{
  }
  .button-dialog{

  }
</style>
