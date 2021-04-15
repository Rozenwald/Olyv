<template lang="pug">
  .review
    .title-review Отзывы
    .comments
      comment(v-if="myComments !== null"
              v-for='item in myComments'
              type='comments'
              :key='item._id'
              :item='item'
              v-show="myComments")
      v-row.no-comments-wrp(v-else align='center' justify='center')
        .no-comments Никто не оставил отзывов
</template>

<script>
import Comment from './Comment.vue';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'review',
  components: {
    Comment,
  },
  data() {
    return {
      comments: null,
    };
  },
  methods: {
    async getFeedbacks() {
      const res = await this.$root.feedbackAPI.receiveInner();
      console.log(res);
      this.comments = this.checkFeedbackResponse(res);
      console.log(this.comments);
    },

    checkFeedbackResponse(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setMyComments', response.data.data);
          return response.data.data;
        case 'notExist':
          return null;
        case 'notAuthentucate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            false,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          logger.log(response.status);
          break;
      }
      return null;
    },
  },
  computed: {
    myComments() {
      return this.$store.getters.getMyComments;
    },
  },
  created() {
    this.getFeedbacks();
  },
};
</script>

<style lang="stylus" scoped>
  .title-review {
    color #656565
  }

  .review {
    margin-top 10px
    margin-bottom 10px
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
  }

  .comment:first-child {
    margin-top 0
  }

  .no-comments-wrp {
    margin 15px
  }
</style>
