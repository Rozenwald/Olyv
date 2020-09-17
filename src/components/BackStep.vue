<template lang="pug">
v-row.container-back(align='center')
  Button.backbutton(@click="stepback()")
    svg-icon(name="BackStep")
</template>

<script>
import posed from 'vue-pose';
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'BackStep',
  components: {
    Button: posed.div({
      draggable: true,
      init: { scale: 1 },
      drag: { scale: 1.2 },
      dragEnd: {
        x: 0,
        y: 0,
        transition: { type: 'spring' },
      },
    }),
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
    z-index: 1000
    position: fixed
    left 0
    top 0
    bottom 0
    background transparent !important
    height 100vh
    width 100px
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
