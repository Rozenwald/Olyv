<template lang="pug">
  #app
    v-app
      appbar
      router-view
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
};
</script>

<style lang="stylus">
  #app{
    background-color #E5E5E5;
    font-family Inter
  }
</style>
