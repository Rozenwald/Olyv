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
import dialogWindow from '../scripts/openDialog';
import logger from '../scripts/logger';

export default {
  name: 'error-chat-dialog',
  methods: {
    repeatSendMessage() {
      console.log(this.msg);
      console.log(this.errorNumber);
      this.errorMsg = {
        element: this.errorNumber,
        show: false,
      };
      this.$store.dispatch('showChatDialog', this.errorMsg);
      axios
        .post(`${this.$baseChatUrl}api/v1/private/message`, {
          token: this.chatToken,
          method: 'add',
          text: this.msg,
          idUserRequest: this.idUserRequest,
        })
        .then((response) => (this.checkAddMessage(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          logger.log(error);
        });
    },
    checkAddMessage(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setErrorShow', this.errorMsg);
          break;
        case 'notAuthenticate':
          break;
        case 'notExist':
          break;
        default:
          dialogWindow.open('Ошибка', '', true, false);
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
      this.$store.dispatch('deleteMessage', this.errorMsg);
    },
  },
  computed: {
    showDialog() {
      return this.$store.getters.isVisibleChatDialog;
    },
    errorNumber() {
      return this.$store.getters.getElement;
    },
    msg() {
      return this.$store.getters.textForErrorDialog;
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
