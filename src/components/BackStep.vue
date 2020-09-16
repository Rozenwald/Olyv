<template lang="pug">
  leaps(
      :to="{x: position.x, y: position.y }"
      ref="leep"
      :damping="20"
      :stiffness="50")
    v-row.container-back(
      v-touch="{right: () => swipe(swipe)}"
      slot-scope="{ leaps }"
      :style="`transform: translate(${leaps.x}px, ${leaps.y}px)`"
      align='center'
      )

      v-btn.backbutton(@click="stepback()")
          svg-icon(name="BackStep")

</template>

<script>
import { Leaps } from 'leaps';
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'BackStep',
  data() {
    return {
      position: {
        x: 0,
        y: 0,
      },
    };
  },
  components: {
    SvgIcon,
    Leaps,
  },
  computed: {
  },
  methods: {
    stepback() {
      this.$router.back();
    },
    swipe(event) {
      const start = { x: event.clientX, y: event.clientY };
      const lastMove = { ...this.position };
      const handleMouseup = () => {
      };
      const handleMousemove = (evt) => {
        const end = { x: evt.clientX, y: evt.clientY };
        const delta = {
          x: end.x - start.x,
          y: end.y - start.y,
        };
        this.position.x = lastMove.x + delta.x;
        this.position.y = lastMove.y + delta.y;
      };
      window.addEventListener('mousemove', handleMousemove);
      window.addEventListener('mouseup', handleMouseup);
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
