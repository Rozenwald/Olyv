<template lang="pug">
  v-bottom-navigation#bottom-navigation(fixed grow v-show="show")
    v-btn.nav-btn(v-for="(item,index) in items"
                  :key="item.title"
                  @click="clickBtn(index, item.routeName)"
                  :ripple="index!=2")
      template(v-if='item.title.length > 0')
        span(v-text="item.title")
        svg-icon.bottom-navigation-icon(:name="item.icon" height="19")
      v-row#create-order-btn(v-else align='center'
                             justify='center'
                             @click.stop="clickBtn(index, item.routeName)"
                            )
        svg-icon(:name="item.icon")
</template>

<script>
import axios from 'axios';
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'bottom-navigation',

  components: {
    SvgIcon,
    axios,
  },

  computed: {
    items() {
      return this.$store.getters.getItemsBottomNavigaion;
    },
    show() {
      return this.$store.getters.isVisibleBottomNavigation;
    },
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },

  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
    showLoginDialog() {
      this.$store.dispatch('showLoginDialog', true);
    },
    clickBtn(index, routeName) {
      if ((index === 2 || index === 3) && !this.isAuth) {
        this.showLoginDialog();
      } else {
        this.route(routeName);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>

  span{
    font-family Golos
    font-style normal
    font-weight 500
    font-size 8px
    line-height 8px
    text-align center
    color #656565
    opacity 0.7
  }

  .bottom-navigation-icon{
    margin-bottom 5px
  }

  .nav-btn{
    max-width 20% !important
    min-width 0 !important
    width 20%
  }

  .v-btn::before{
     background-color #FFFFFF !important
  }

  #create-order-btn{
    position absolute
    width 60px
    height 60px
    bottom 7px
    left 50%
    margin-left -30px
    border-radius 30px
    background linear-gradient(180deg, #65EB9C 0%, #068B4B 100%)
    border 5px solid #FFFFFF
    box-shadow: 0px -8px 8px -9px rgba(0, 0, 0, 0.2)
  }
</style>
