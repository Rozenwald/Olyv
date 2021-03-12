<template lang="pug">
  .header
    v-row.avatar(align='center' justify='center')
      v-skeleton-loader(type="avatar" :loading="!user._id")
        v-row.avatar-wrp()
          avatar(size="100" :src="avatar" :fullscreen="true" :urlMax="avatarMax")
    v-row.name(align='center' justify='center')
      v-skeleton-loader(type="text" :loading="!user._id" width="90")
        span(v-if="user.name && user.lastname") {{user.name}} {{user.lastname}}
        span(v-else) {{user.email}}
    v-row.verification(v-if="user.role = 'executor'" justify='center')
      v-skeleton-loader(type="text" :loading="!user._id")
        v-icon.verification-icon(color='#656565') beenhere
        span {{user.name}} подтвердил(а) свою личность
</template>

<script>
import Avatar from '../Avatar.vue';

export default {
  name: 'public-header',
  components: {
    Avatar,
  },
  props: {
    user: Object,
  },
  computed: {
    avatar() {
      if (!this.user.photo?.length) return null;

      const url = this.user.photo[this.user.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
    },

    avatarMax() {
      if (!this.user.photo?.length) return null;

      const url = this.user.photo[this.user.photo.length - 1].urlMax.substr(1);
      return this.$baseUrlNoPort + url;
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

  .avatar {
    margin-bottom 15px
  }

  .name {
    line-height 1.2
    font-weight bold
  }

  .verification {
    margin-bottom -5px;
    margin-top 12px
    color #656565
    text-align center

    &-icon {
      margin-right 5px
    }
  }

  .v-skeleton-loader__text{
    height 36px !important
    border-radius 0 !important
  }
</style>
