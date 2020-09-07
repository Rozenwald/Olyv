<template lang="pug">
  swiper.swiper
    v-card.card(@click='this.route')

      v-row.main-part(no-gutters)

          v-col(cols="8").description-wrp
            .description {{item.description}}

          v-col(cols="4" align='right')
            v-row.cost-wrp(align='center' justify='center')
              .cost {{cost}}

      v-row.more-info-wrp(align='center' justify='start' no-gutters)

        v-row.response-wrp(align='center' justify='start')
          svg-icon(name="Responded")
          .response-text
            span Откликнулось <br/>
            span.black-text ??? человек

        v-row.date-time-wrp(align='center' justify='start')
          svg-icon(name="Time")
          .distantion-text
            span Время создания <br/>
            span.black-text ???
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'OrderCard1',
  components: {
    SvgIcon,
    Swiper,
    SwiperSlide,
  },
  props: {
    type: String,
    item: Object,
  },
  data() {
    return {
      text: 'Я еблан помогите мне пожалуйста прошу я хочу домои спать аааа блять сука помогите мне кто-нибудь хочу очень сильно секса. Люблю',
    };
  },
  methods: {
    route() {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('setMyOrder', { order: this.item, type: this.type });
      this.$router.push('customerMoreInfo');
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    cost() {
      const costStr = String(this.item.cost);
      if (costStr.length > 6) {
        return `${costStr.substr(0, 1)}М`;
      }
      if (costStr.length > 5) {
        return `${costStr.substr(0, 3)}K`;
      }
      return `${this.item.cost} P`;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .swiper{
    border 0
    margin-top 10px
  }

  .card {
    padding 10px 0 10px 10px
  }

  .swiper:first-child {
    margin-top 0
  }

  .row{
    margin 0
  }

  .main-part{
    margin-bottom 10px
  }

  .description {
    overflow hidden
    text-overflow ellipsis
    line-height 1.2
    height 57.6px
    display -webkit-box
    -webkit-line-clamp 3
    -webkit-box-orient vertical
    margin-right 5px
  }

  .cost-wrp {
    margin 0
    height 36px
    max-width 100px
    background #FEF5EE
    border-radius 0px 10px 10px 0px
    transform rotate(180deg)
  }

  .cost {
    font-style normal
    font-weight bold
    font-size 18px
    color #FE7664
    transform rotate(180deg)
  }

  .more-info-wrp {
    text-align center
    font-style normal
    font-size 10px
    line-height 1.4
    color #65686C
  }

  .more-info-wrp svg {
    margin-right 5px
  }
</style>
