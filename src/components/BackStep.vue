<template lang="pug">
v-row.container-back(align='center')
  v-btn.backbutton(@click="stepback()")
    svg-icon(name="BackStep")
</template>

<script>
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'appbar',
  components: {
    SvgIcon,
  },
  computed: {
  },
  methods: {
    stepback() {
      this.$router.back();
    },
  },
};
</script>

<style lang="stylus" scoped>
  .container-back{
    position: fixed
    left 0
    top 0
    bottom 0
    background transparent !important
    height 100vh
    width 1px
  }
  .backbutton{
    top 0
    bottom 0
    color #000
    background #fef5ee !important
    width 30px
    min-width 25px !important
    height 60px !important
    border-radius 50%
    padding 0 !important
  }
</style>
