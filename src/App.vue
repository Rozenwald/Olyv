<template lang="pug">
  #app
    v-app
      Appbar(title="loh")
      router-view
      BottomNavigation
</template>

<script>

import Appbar from './components/Appbar.vue';
import BottomNavigation from './components/BottomNavigation.vue';

export default {
  name: 'App',

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
