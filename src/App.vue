<template lang="pug">
  #app
    v-app
      appbar
      router-view.router
      bottom-navigation
      login-dialog
</template>

<script>

import Appbar from './components/Appbar.vue';
import BottomNavigation from './components/BottomNavigation.vue';
import store from './store/index';
import LoginDialog from './components/LoginDialog.vue';

export default {
  name: 'App',
  store,
  components: {
    Appbar,
    BottomNavigation,
    LoginDialog,
  },

  data: () => ({
    //
  }),

  created() {
    this.$store.dispatch('setToken', window.localStorage.getItem('token'));
  },
};
</script>

<style lang="stylus">
  #app{
    background-color #E5E5E5;
    font-family Inter
  }
  .router{
    padding-bottom 63px+12px
    padding-top 56px+12px
  }
</style>
