<template lang='pug'>
  .swiper-container(:id="id")
    .swiper-wrapper
      v-list(class="swiper-slide")
      v-card.card.swiper-slide(@click="route('chat')")
          v-list-item(dense)
            v-list-item-avatar(color="grey")
            v-list-item-content
              v-list-item-title {{distation}}
            v-list-item-action
              v-row.cost-wrp(align='center' justify='center')
                .cost {{cost}}
</template>

<script>
import 'swiper/swiper-bundle.css';
import { Swiper } from 'swiper/swiper.esm';

export default {
  name: 'OrderCard1',
  props: {
    title: String,
    cost: String,
    distation: String,
    idUser: String,
  },
  data() {
    return {
      id: String,
    };
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },

    getRandomId() {
      return `id${Math.floor(Math.random * Math.floor(100))}`;
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
    // eslint-disable-next-line func-names
    swiper.on('transitionEnd', function () {
      if (this.activeIndex === 0) {
        self.$emit('transitionEnd');
        this.destroy();
      }
    });
  },

  created() {
    this.id = this.getRandomId();
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
