<template lang="pug">
  v-bottom-navigation#bottom-navigation(fixed v-show="show" color="teal")
    v-btn.nav-btn(v-for="(item,index) in items"
                  :key="item.title"
                  @click="clickBtn(index, item.routeName)"
                  :ripple="index!=2"
                 )
      template(v-if='index!=2')
        span(v-text="item.title")
        svg-icon.bottom-navigation-icon(:name="item.icon" :color="item.color" height="19")
      v-row#create-order-btn(v-else align='center'
                             justify='center'
                             @click.stop="clickBtn(index)"
                            )
        svg-icon(:name="item.icon")
</template>

<script>
import SvgIcon from './SvgIcon.vue';
import dialog from '../scripts/openDialog';
import dialogMessages from '../scripts/dialogMessages';

export default {
  name: 'bottom-navigation',
  components: {
    SvgIcon,
  },
  computed: {
    items() {
      return this.$store.getters.getItemsBottomNavigaion;
    },
    show() {
      if (this.currentRouteName === 'auth' || this.currentRouteName === 'registration'
          || this.currentRouteName === 'customerMoreInfo' || this.currentRouteName === 'executorMoreInfo'
          || this.currentRouteName === 'chat' || this.currentRouteName === 'keyWords'
          || this.currentRouteName === 'successUpdatePassword' || this.currentRouteName === 'confirmCabinet') return false;

      return this.bottomNavigationStatus;
    },
    currentRouteName() {
      return this.$route.name;
    },

    isAuth() {
      return this.$store.getters.isAuth;
    },

    bottomNavigationStatus() {
      return this.$store.getters.isVisibleBottomNavigation;
    },
  },

  methods: {
    route(name) {
      this.$router.push({ name });
    },
    clickBtn(index, routeName) {
      if ((index === 2 || index === 3 || index === 4) && !this.isAuth) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('needToAuth'),
          true,
          true,
          () => { this.$router.push({ name: 'auth' }); },
        );
      } else if (index === 2) {
        this.$store.dispatch('setMainSheetStatus', true);
      } else {
        this.route(routeName);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .accept-btn{
    width 80%
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    box-shadow none !important
  }
  .create{
    background-color #FFF
    padding 20px
    border-radius 25px 25px 0px 0px
  }
  span{
    font-family Golos
    font-style normal
    letter-spacing 0.084em
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
    box-shadow: 0px -9px 5px -8px rgba(0, 0, 0, 0.1)
  }
</style>
