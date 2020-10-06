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
export default {
  name: 'error-chat-dialog',
  data() {
    return {
    };
  },
  methods: {
    repeatSendMessage() {
      this.$store.dispatch('showChatDialog', false);
    },
    copyMessage() {
      this.$store.dispatch('showChatDialog', false);
    },
    editMessage() {
      this.$store.dispatch('showChatDialog', false);
    },
    deleteMessage() {
      this.$store.dispatch('showChatDialog', false);
    },
  },
  computed: {
    showDialog() {
      return this.$store.getters.isVisibleChatDialog;
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
