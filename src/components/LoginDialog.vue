<template lang="pug">
  v-dialog(v-model="showDialog")
    v-card
      v-card-title.headline Авторизация
      v-card-text Необходима авторизация
      v-card-actions
        v-spacer
        v-btn(color="green darken-1" text @click="route") Перейти
</template>

<script>
export default {
  name: 'login-dialog',
  data() {
    return {
      show: false,
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.getters.isVisibleLoginDialog;
      },
      set(val) {
        this.$store.dispatch('showLoginDialog', val);
      },
    },
  },
  methods: {
    route() {
      this.showDialog = false;
      this.$router.push('auth');
    },
  },
};
</script>

<style lang="stylus" scoped>
  .row{
    margin 0 !important;
    background-color #fff !important;
  }
</style>
