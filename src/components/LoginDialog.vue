<template lang="pug">
  v-dialog(v-model="showDialog")
    v-row(align='center' justify='center')
      .dialog_title Необходима авторизация
    v-btn(@click="route") Войти
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
      this.$router.push('Registration');
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
