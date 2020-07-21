<template lang='pug'>
            v-card#Order(
            )
                template
                    img#user-avatar(src="../assets/photo-camera.png", alt="фото профиля")
                    #Title {{title}}
                    #Cost {{cost}}
</template>

<script>
export default {
  name: 'OrderCard1',
  props: {
    title: String,
    cost: String,
  },
};
</script>

<style lang="stylus" scoped>

    #TextOrderContainer{
        width 100%
        height 100%
    }
    #Order{
        margin 3px
        text-align left
        position relative
        background-color #FFFFFF
        height 50px
        width 100%
        padding-right 0
        padding-left 0
        border 1px solid black
        border-radius 6px
    }
    #user-avatar{
        display inline-block
        margin 5px
        width 40px
        height 40px
        vertical-align middle
        text-align center
        border 1px solid black
        border-radius 50%
    }
    #Title{
        display inline-block
        vertical-align middle
        text-align left
        font-weight: bold;
        font-family: Inter;
        font-style: normal;
        line-height 30px
        padding-left 10px
        padding-right 10px
        padding-top 10px
        padding-bottom 10px
        height 50px
    }
    #Cost{
        position absolute
        right 0
        display inline-block
        height 50px
        line-height 30px
        font-weight: bold;
        font-family: Inter;
        font-style: normal;
        padding-left 10px
        padding-right 10px
        padding-top 10px
        padding-bottom 10px
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
