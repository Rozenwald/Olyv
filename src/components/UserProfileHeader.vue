<template lang="pug">
  v-row.header
    v-row(align='center' justify='space-between')
      v-row(align='center')
        v-avatar(size='62' color='#56D68B')
          svg-icon(name='PhotoCamera'  width='60' height='15')
        .name-ratting-wrp
          .name {{name}} {{lastname}}
          .ratting
            v-rating(
              :length="5"
              readonly
              :half-increments="true"
              :dense="true"
              color="#FFCA10"
              background-color="#FFCA10"
              size="14"
            )
      popup-menu-profile
</template>

<script>
import SvgIcon from './SvgIcon.vue';
import PopupMenuProfile from './PopupMenuProfile.vue';

export default {
  name: 'user-profile-header',
  components: {
    SvgIcon,
    PopupMenuProfile,
  },
  data() {
    return {

    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    name() {
      if (this.user.name == null) {
        return this.user.email;
      }
      return this.user.name;
    },
    lastname() {
      return this.user.lastname;
    },
  },
  created() {
  },
};
</script>

<style lang="stylus" scoped>
  .row {
    margin 0
  }

  .col {
    padding 0
  }

  .v-avatar {
    margin-right 12px
  }

  .name-ratting-wrp {
    line-height 1.2
  }

  .name {
    font-weight bold
  }
</style>
