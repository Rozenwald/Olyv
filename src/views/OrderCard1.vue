<template lang='pug'>
            v-card#Order(max-width
                        @click="this.route")
                #TextOrderContainer
                    #Title {{item.description}}
                    #cost {{item.cost}}
</template>

<script>
export default {
  name: 'OrderCard1',
  props: {
    item: Object,
  },
  methods: {
    route() {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('setMyOrderId', this.item._id);
      this.$router.push('myOrder');
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

    #TextOrderContainer{
        width 100%
        height 65%
    }
    #Order{
        text-align left
        position relative
        background-color #FFFFFF
        height 120px
        padding-right 0
        padding-left 0
        margin-top 10px
        border-radius 6px
    }
    #Title{
        width 70%
        height 100%
        overflow hidden
        text-overflow ellipsis
        text-align left
        word-break normal
        white-space: normal
        position relative
        font-size: 16px
        left  16px
        top 11px
    }
    #cost{
        height 36px
        line-height 22px
        font-weight: bold;
        font-family: Inter;
        font-style: normal;
        color #FE7664
        padding-left 12px
        padding-right 12px
        padding-top 7px
        padding-bottom 7px
        position absolute

        background-color #FEF5EE
        border none
        border-radius 5px 0px 0px 5px
        font-size: 18px
        right 0
        top 14px
    }

    #Toolbar{
        background-color: #56D68B
    }
    .write{
        color #FFA967
        position fixed
        bottom: 0;
        right 0;
        left 0;
        margin-right 15px;
    }
    #You{
        text-align right
        margin 15px
        align-items flex-start
    }
    #YouBtn{
        position relative
        background-color #C9F0D9
        width 70%
        height 70px
        border none
        border-radius 15px 0px 15px 15px
        right: 0;
    }
    #Friend{
        display block
        text-align left
        margin 15px
    }
    #FriendImg{
        display inline-block
        position relative
        margin  7px
        background-color #d9d9d9
        height 40px
        width 40px
        border none
        border-radius 50%
        left 0
    }
    #FriendBtn{
        display inline-block
        display flex
        height 40px
        width 70%
        border none
        border-radius 0px 15px 15px 15px
        background-color #d9d9d9
        margin-top 7px
    }
    .container{
        justify-content center
        position relative
        width 100%;
        height 100%;
        padding 0px;
        text-align: center;
        vertical-align middle
    }

</style>
