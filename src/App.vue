<template lang="pug">
  #app
    v-app
      appbar
      router-view
      bottom-navigation
</template>

<script>

import Appbar from './components/Appbar.vue';
import BottomNavigation from './components/BottomNavigation.vue';
import store from './store/index';

export default {
  name: 'App',
  store,
  components: {
    Appbar,
    BottomNavigation,
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
