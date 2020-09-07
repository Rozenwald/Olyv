<template lang="pug">
  v-app-bar#toolbar(app v-show="show" fixed)
    v-row(align='center', justify='center')
      .toolbar-avatar-wrp(v-show="currentRouteName == 'chat'")
        avatar(size="36" color="#AEAEAE" :src="src")
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

    show() {
      return this.$store.getters.isVisibleAppbar;
    },

    userRequest() {
      return this.$store.getters.getUserRequest;
    },

    currentRouteName() {
      return this.$route.name;
    },

    src() {
      if (!this.userRequest) {
        return null;
      }

      if (this.userRequest.photo.length) {
        return this.userRequest.photo[this.userRequest.photo.length - 1].urlMin;
      }

      return null;
    },

    userName() {
      if (!this.user) {
        return null;
      }

      if (this.user.name) {
        return `${this.user.name} ${this.user.lastname}`;
      }

      return this.user.email;
    },
  },
};
</script>

<style lang="stylus" scoped>

  #toolbar{
    background-color #56D68B
    box-shadow 0px 2px 2px rgba(0, 0, 0, 0.05)
    max-height 56px
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
