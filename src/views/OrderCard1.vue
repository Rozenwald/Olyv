<template lang="pug">
  v-card.Order(max-width @click='this.route')
    .text-cost-container
      .text-container
        .text {{item.description}}
      .cost-container
        .cost {{item.cost}} ₽
        .lowcost
          svg-icon.lowcost-icon(name='Lowcost'  width='16' height='16')
          .lowcost-cost {{item.cost}} ₽
    .icon-container
      .icon-first
        svg-icon.icon(name='Responded'  width='20' height='20')
        .icon-text
      .icon-second
        svg-icon.icon(name='Time'  width='20' height='20')
        .icon-text
</template>

<script>
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'OrderCard2',
  components: {
    SvgIcon,
  },
  props: {
    item: Object,
  },
  methods: {
    route() {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('setMyOrder', this.item);
      this.$router.push('moreInfoOrder');
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .Order{
    text-align left
    display flex
    background-color #FFFFFF
    height 120px
    padding-top 10px
    padding-left 10px
    padding-bottom 10px
    margin-top 10px
    border-radius 6px
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
      }
        .text{
          width 100%
          height 100%
          overflow hidden
          text-overflow ellipsis
          text-align left
          word-break normal
          white-space: normal
          font-size: 15px
        }
      .cost-container{
        flex-wrap nowrap
        flex 1 1 30%
        justify-content center
        height 70px;
        padding 0px;
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
          right 0
          top 14px
        }
        .lowcost{
          display flex
        }
          .lowcost-icon{
            flex-wrap nowrap
            justify-content center
            text-align center
            vertical-align middle
          }
          .lowcost-cost{
            flex-wrap nowrap
            height 20px
            line-height 18px
            font-weight: bold;
            font-family: Inter;
            font-style: normal;
            color #FE7664
            padding-left 12px
            padding-right 12px
            padding-top 7px
            padding-bottom 7px

            border none
            border-radius 5px 0px 0px 5px
            font-size: 14px
            right 0
            top 50px
          }
    .icon-container{
      justify-content space-around
      height 30px
      display flex
      flex-wrap wrap
      width 100%
      align-items center
    }
      .icon-first{
        padding-top 5px
      }
        .icon{
        }
        .icon-text{}
      .icon-second{
        padding-top 5px
      }
        .icon{}
        .icon-text{}
  .Order:first-child{
    margin-top 0
  }

</style>
