<template lang="pug">
v-row.container-back(
    align='center'
    @click="bubbleVisible()"
    )
  Button.backbutton(
      :pose="isWidth ? '0' : '350'"
      v-show="show"
      v-on:drag-end="stepback()"
      )
    //svg-icon.icon(name="BackStep")
</template>

<script>
import posed from 'vue-pose';
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'BackStep',
  props: ['isWidth'],
  data() {
    return {
      bubble: false,
    };
  },
  components: {
    Button: posed.div({
      draggable: true,
      pressable: true,
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
    show() {
      return this.$store.getters.visibleBubble;
    },
  },
  methods: {
    stepback() {
      this.$router.back();
    },
    bubbleVisible() {
      this.$store.dispatch('showBubble', true);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .container-back{
    position: fixed
    left 12px
    top 0
    bottom 0
    background transparent !important
    height 100vh
    width 12px
  }
  .backbutton{
    top 0
    bottom 0
    background #fe7664 !important
    width 31px
    min-width 30px !important
    height 30px !important
    border-radius 50%
    padding 0 !important
  }
  .icon{
    left 0
    top 0
    right 0
    bottom 0
  }
</style>
