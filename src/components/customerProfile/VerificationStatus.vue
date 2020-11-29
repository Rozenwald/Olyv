<template lang="pug">
  .verification-status(v-show="user.verification == 'await' || comment")
    .title-verification Верификация
    v-row.status-wrp(align='center' justify='center')
      .await(v-text="'Ожидание верификации'" v-show="user.verification == 'await' && !comment")
      .fail(v-text="'Отказ в верификации'" v-show="comment")
    v-row.action(align='center' justify='center')
      v-btn.comment(v-text="'Посмотреть комментарий'" text v-show="comment" @click='route')
</template>

<script>
import axios from 'axios';

export default {
  name: 'verification-status',
  components: {
    axios,
  },
  methods: {
    route() {
      this.$router.push('verification');
    },
  },
  computed: {
    comment() {
      return this.$store.getters.getComment;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .verification-status {
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    margin-bottom 12px
  }

  .row {
    margin 0
  }

  .title-verification {
    color #656565
  }

  .status-wrp {
    margin 15px 0
  }

  .action {
    margin 0 -12px
  }

  .comment {
    width 100%
    margin-top 15px
    margin-bottom -12px
    border-radius 0
  }

  .fail {
    color #F44336;
  }
</style>
