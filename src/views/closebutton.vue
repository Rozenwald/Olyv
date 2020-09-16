<template lang="pug">
  <swipe class="my-swipe">
    <swipe-item class="slide1"></swipe-item>
    <swipe-item class="slide2"></swipe-item>
    <swipe-item class="slide3"></swipe-item>
  </swipe>
</template>

<script>
import axios from 'axios';
import { Swipe, SwipeItem } from 'vue-swipe';
import SvgIcon from '../components/SvgIcon.vue';
import LeftMsg from '../components/LeftMsg.vue';
import RightMsg from '../components/RightMsg.vue';

export default {
  name: 'Closed',
  components: {
    SvgIcon,
    axios,
    LeftMsg,
    RightMsg,
    Swipe,
    SwipeItem,
  },
};
</script>

<style lang="stylus" scoped>
  .my-swipe {
  height: 400px;
  background-color: #000;
  font-size: 30px;
  text-align: center;
}

.slide1 {
  background-color: #0089dc;
  color: #000;
}

.slide2 {
  background-color: #ffd705;
  color: #444;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}

</style>
