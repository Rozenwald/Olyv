<template lang="pug">
  .header
    v-row.avatar(align='center' justify='center')
      v-skeleton-loader(type="avatar" :loading="!hasData")
        v-avatar(size='62' color='#56D68B')
          svg-icon(name='PhotoCamera'  width='60' height='15'  v-if="!this.photo")
          v-img(:src="this.photo" v-if="this.photo")
    v-row.name(align='center' justify='center')
      v-skeleton-loader(type="text" :loading="!hasData" width="90")
        span {{name}} {{lastname}}
    v-row.ratting(align='center' justify='center')
      v-skeleton-loader(type="text" :loading="!hasData" width="70")
        v-rating(
          :length="5"
          readonly
          :half-increments="true"
          dense
          color="#FFCA10"
          background-color="#FFCA10"
          size="14"
        )
    user-profile-subheader
    v-row.actions(align='center' justify='center')
      v-btn.edit-data(
        text
        v-show="Object.keys(user).length && user.name == null"
        v-text="'Редактировать данные'"
        @click='route("setUserData")'
      )
      v-btn.go-verification(
        text
        v-text="'Стать исполнителем'"
        v-show="user.verification == 'notCompleted' && user.name != null && !comment"
        @click='route("verification")'
      )
</template>

<script>
import SvgIcon from './SvgIcon.vue';
import PopupMenuProfile from './PopupMenuProfile.vue';
import UserProfileSubheader from './UserProfileSubheader.vue';

export default {
  name: 'user-profile-header',
  components: {
    SvgIcon,
    PopupMenuProfile,
    UserProfileSubheader,
  },
  data() {
    return {

    };
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    hasData() {
      return this.$store.getters.hasData;
    },
    photo() {
      if (!this.hasData) {
        return null;
      }
      if (!this.user.photo.length) {
        return null;
      }
      return this.user.photo[this.user.photo.length - 1].urlMin;
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
    comment() {
      if (this.$store.getters.getComment == null) {
        return '';
      }
      return this.$store.getters.getComment;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .row {
    margin 0
  }

  .header {
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    margin-bottom 12px
  }

  .avatar, .ratting {
    margin-bottom 15px
  }

  .actions button {
    width 100%
    margin-top 15px
    margin-bottom -12px
    border-radius 0
  }

  .actions {
    margin 0 -12px
  }

  .name, .ratting {
    line-height 1.2
  }

  .name {
    font-weight bold
  }

  .v-skeleton-loader__text{
    height 36px !important
    border-radius 0 !important
  }
</style>
