<template lang="pug">
  .executor-profile-wrp
    .executor-profile
      UserProfileData
      v-container(fluid)
        v-row
          v-col.d-flex.child-flex.custom-card-wrp(v-for='n in 10', :key='n', cols='4')
            v-card.d-flex.custom-card(flat, tail)
              v-img.grey.lighten-2(:src='`https://picsum.photos/500/300?image=${n * 5 + 10}`', :lazy-src='`https://picsum.photos/10/6?image=${n * 5 + 10}`', aspect-ratio='1')
                template(v-slot:placeholder)
                  v-row.fill-height.ma-0(align='center', justify='center')
                    v-progress-circular(indeterminate, color='grey lighten-5')
      v-btn(rounded id="btn-add-media") Добавить медиа
</template>

<script>

import UserProfileData from './UserProfileData.vue';

export default {
  name: 'ExecutorProfile',
  components: {
    UserProfileData,
  },
};
</script>

<style lang="stylus" scoped>

  .executor-profile{
    margin 0 5px
    text-align center
  }

  .user-profile-wrp{
    margin 120px auto 25px
  }

  .custom-card-wrp{
    padding 10px
  }

  .custom-card{
    border-radius 10px !important
  }

  #btn-add-media{
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 240px
    margin-top 25px
  }

</style>
