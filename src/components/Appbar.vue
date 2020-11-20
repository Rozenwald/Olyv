<template lang="pug">
  v-app-bar#toolbar(app v-show="showAppbar" fixed dense)
    v-btn.back-step-btn(
        v-if="showBackbtn"
        depressed fab small
        @click="stepback()")
      v-icon(color="white") arrow_back
    v-row(align='center', justify='center')
      .toolbar-avatar-wrp(v-show="currentRouteName == 'chat'")
        avatar(size="36" color="#AEAEAE" :src="photo")
      .toolbar-title-wrapper
        .toolbar-title {{title}}
</template>

<script>
import Avatar from './Avatar.vue';

export default {
  name: 'appbar',
  components: {
    Avatar,
  },
  computed: {
    title() {
      return this.$store.getters.getTitle;
    },

    showAppbar() {
      return this.$store.getters.isVisibleAppbar;
    },

    showBackbtn() {
      switch (this.$route.name) {
        case 'moiZakazi':
          return true;
        case 'spisokZakazov':
          return true;
        case 'customerProfile':
          return true;
        case 'setting':
          return true;
        default:
          return false;
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
    stepback() {
      this.$router.back();
    },
  },
};
</script>

<style lang="stylus" scoped>
  .back-step-btn{
    position absolute
    background-color transparent !important
  }
  #toolbar{
    background-color #56D68B
    box-shadow 0px 2px 2px rgba(0, 0, 0, 0.05)
  }

  .toolbar-title-wrapper{
    font-style normal
    font-weight 600
    font-size 17px
    color #FFFFFF
  }

  .toolbar-avatar-wrp {
    margin-right 12px
  }
</style>
