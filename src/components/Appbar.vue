// Стили написаны по код стайлу
// Ошибки описывать здесь не нужно
<template lang="pug">
  v-app-bar.toolbar(app v-show="showAppbar" fixed dense)
    v-btn.toolbar-back-btn(
        v-if="showBackbtn"
        depressed fab small
        @click="stepback()")
      v-icon(color="white") arrow_back
    v-row(align='center', justify='center')
      .toolbar-avatar(v-show="currentRouteName == 'chat'")
        avatar(size="36" color="#AEAEAE" :src="photo")
      .toolbar-title
        .toolbar-title-text {{title}}
    v-btn.toolbar-setting-btn(
        v-if="showSettingBtn"
        depressed fab small
        @click="route()")
      svg-icon(color="white" name="Setting")
</template>

<script>
import Avatar from './Avatar.vue';
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'appbar',
  components: {
    Avatar,
    SvgIcon,
  },
  computed: {
    title() {
      return this.$store.getters.getTitle;
    },
    showAppbar() {
      if (this.currentRouteName === 'auth' || this.currentRouteName === 'registration' || this.currentRouteName === 'recoveryPassword' || this.currentRouteName === 'updatePassword') return false;
      return true;
    },
    showSettingBtn() {
      switch (this.$route.name) {
        case 'customerProfile':
          return true;
        default:
          return false;
      }
    },
    showBackbtn() {
      switch (this.$route.name) {
        case 'allChat':
          return false;
        case 'moiZakazi':
          return false;
        case 'myAwaitOrders':
          return false;
        case 'myProcessOrders':
          return false;
        case 'spisokZakazov':
          return false;
        case 'customerProfile':
          return false;
        case 'allOrder':
          return false;
        case 'awaitOrder':
          return false;
        case 'keyOrder':
          return false;
        case 'processOrder':
          return false;
        default:
          return true;
      }
    },
    userRequest() {
      return this.$store.getters.getUserRequest;
    },
    currentRouteName() {
      return this.$route.name;
    },
    photo() {
      if (!this.userRequest) {
        return ' ';
      }
      if (!this.userRequest.photo) {
        return ' ';
      }
      if (!this.userRequest.photo.length) {
        return null;
      }
      const url = this.userRequest.photo[this.userRequest.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
    },
    userName() {
      if (!this.user) {
        return null;
      }
      if (this.user.name) {
        return `${this.user.name} ${this.user.lastname || ''}`;
      }
      return this.user.email;
    },
  },
  methods: {
    route() {
      this.$router.push({ name: 'setting' });
    },
    stepback() {
      this.$router.back();
    },
  },
};
</script>

<style lang="stylus" scoped>
  .toolbar {
    background-color #56D68B !important
    box-shadow 0px 2px 2px rgba(0, 0, 0, 0.05) !important

    &-back-btn {
    position absolute
    background-color transparent !important
    }
    &-avatar {
      margin-right 12px
    }
    &-title{
      font-style normal
      font-weight 600
      font-size 17px
      color #FFFFFF
      &-text{}
    }
    &-setting-btn {
    position absolute
    right 16px
    background-color transparent !important
    }
  }
</style>
