<template lang="pug">
    swiper.swiper
      v-card.order(max-width @click='this.route')
        .text-cost-container
          .text-container
            .text {{item.description}}
          .cost-container
            .cost {{item.cost}} ₽
            .lowcost
              svg-icon.lowcost-icon(name='Lowcost'  width='13' height='13')
              .lowcost-cost {{item.cost}} ₽
        .icon-container
          .icon-first
            svg-icon.icon(name='Responded'  width='25' height='25')
            .icon-text Откликнулось
          .icon-second
            svg-icon.icon(name='Time'  width='25' height='25')
            .icon-text Время создания
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
    item: Object,
  },
  methods: {
    route() {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('setMyOrder', this.item);
      this.$router.push('customerMoreInfo');
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  mounted() {
  },
};
</script>

<style lang="stylus" scoped>
  .swiper{
    height 122px
    padding-top 1px
    padding-bottom 1px
    margin-top 10px
    display flex
    border-radius 6px
    background-color #f7f7f7
  }

  .swiper:translate3d{
  }

  .swiper:first-child {
    margin-top 0
  }

  .order{
    text-align left
    display flex
    background-color #FFFFFF
    padding-top 10px
    padding-left 8px
    border-radius 6px
    margin-left 15px
    margin-right 15px
    flex-wrap wrap
  }
    .text-cost-container{
        width 100%
        height 70px
        display flex
        flex-wrap wrap
    }
      .text-container{
        display flex
        flex-wrap nowrap
        flex 1 1 70%
        height 100%
        overflow hidden
        text-overflow ellipsis
        text-align left
        word-break break-all
        white-space: normal
      }
        .text{
          width 100%
          height 100%
          overflow hidden
          text-overflow ellipsis
          text-align left
          word-break break-all
          white-space: normal
          font-size: 15px
          padding-bottom 5px
          padding-right 5px
        }
      .cost-container{
        flex-wrap nowrap
        flex 1 1 30%
        height 70px;
        padding 0px;
        justify-content center
        text-align: center;
        vertical-align middle
      }
        .cost{
          display block
          height 30px
          line-height 20px
          font-weight: bold;
          font-family: Inter;
          font-style: normal;
          color #FE7664
          padding-left 12px
          padding-right 12px
          padding-top 5px
          padding-bottom 5px
          background-color #FEF5EE
          border none
          border-radius 5px 0px 0px 5px
          font-size: 17px
        }
        .lowcost{
          display flex
          height 30px
          padding-top 5px
          padding-bottom 5px
          padding-left 12px
          padding-right 12px
          text-align: center;
          vertical-align middle
          justify-content center
        }
          .lowcost-icon{
            flex-wrap nowrap
            line-height 13px
            justify-content center
            text-align center
            vertical-align middle
          }
          .lowcost-cost{
            flex-wrap nowrap
            height 20px
            line-height 20px
            font-weight: bold;
            font-family: Inter;
            font-style: normal;
            color #FE7664

            border none
            border-radius 5px 0px 0px 5px
            font-size: 13px
          }
    .icon-container{
      margin-top 4px
      height 26px
      display flex
      flex-wrap wrap
      width 100%
      align-items center
    }
      .icon-first{
        display flex
        flex-wrap nowrap
        margin-right 25px
      }
        .icon{
          flex 1 1 auto
        }
        .icon-text{
          flex 1 1 auto
          margin-left 7px
          line-height 13px
          font-size 13 px
        }
      .icon-second{
        display flex
        flex-wrap nowrap
      }
        .icon{
          flex 1 1 auto
        }
        .icon-text{
          flex 1 1 auto
        }
  .Order:first-child{
    margin-top 0
  }
</style>
