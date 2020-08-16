<template lang="pug">
  swiper.swiper
    v-card.card
        v-list-item(dense)
          v-list-item-content
            v-list-item-title {{message}}
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'msgCard',
  props: {
    message: String,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  mounted() {
    const self = this;
    const el = `#${this.id}`;

    // Initialize Swiper
    const swiper = new Swiper(el, {
      initialSlide: 1,
      resistanceRatio: 0,
      speed: 150,
    });

    swiper.on('transitionEnd', function () {
      if (this.activeIndex === 0) {
        self.$emit('transitionEnd');
        this.destroy();
      }
    });
  },
};
</script>

<style lang="stylus" scoped>
  swiper{
    width 100%
    padding-top 1px
    padding-bottom 1px
    background-color #f7f7f7
  }
  .card{
      margin-bottom 7px
      background-color #C9F0D9
      max-width 80%
      position right !important
  }

  .cost-wrp {
    background #FEF5EE
    border-radius 10px 0 0 10px
    width 100px
    height 36px
    max-width 100px
    margin-right -16px
  }

  .cost {
    font-family Golos
    font-style normal
    font-weight 600
    font-size 18px
    color: #FE7664
  }
</style>
