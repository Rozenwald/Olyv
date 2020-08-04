<template lang='pug'>
  .swiper-container(:id="id")
    .swiper-wrapper
      v-card.card.swiper-slide
          v-list-item(dense)
            v-list-item-content
              v-list-item-title {{message}}
</template>

<script>
import 'swiper/swiper-bundle.css';
import { Swiper } from 'swiper/swiper.esm';

export default {
  name: 'msgCard',
  props: {
    message: String,
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
  .card{
      margin-bottom 7px
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
