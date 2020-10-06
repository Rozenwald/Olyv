<template lang="pug">
v-dialog(v-model="showDialog")
  v-card
    v-card-title.headline Упс...
    v-card-text(v-text="text")
    v-card-actions
      v-spacer
      v-btn(color="green darken-1" text @click="route") Перейти
</template>

<script>
export default {
  name: 'repeat-login-dialog',
  data() {
    return {
      text: 'Мы обнаружили вход в Ваш аккаунт с другого устройства. Пожалуйста пройдите повторную авторизацию',
    };
  },
  methods: {
    route() {
      this.showDialog = false;
      this.$router.push('auth');
    },
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.getters.isVisibleRepeatLoginDialog;
      },
      set(val) {
        this.$store.dispatch('setToken', null);
        this.$store.dispatch('showRepeatLoginDialog', val);
      },
    },
  },
};
</script>
