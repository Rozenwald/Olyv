<template lang="pug">
  .review
    .title-review Отзывы
    .comments
      comment(v-if="comments !== null"
              v-for='item in comments'
              type='comments'
              :key='item._id'
              :item='item'
              v-show="comments")
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
  props: {
    type: String,
    userId: String,
  },
  beforeRouteUpdate(to, from, next) {
    console.log('to: ', to);
    console.log('from: ', from);
    const { userId } = to.params;
    next();
    this.init(userId);
  },
  data() {
    return {

    };
  },
  methods: {
    async init(userId) {
      if (this.type === 'myProfile') {
        const response = await this.$root.feedbackAPI.receiveInner();
        return this.checkFeedbackResponse(response) || {};
      }
      const response = await this.$root.feedbackAPI.receiveByUserId(userId);
      return this.checkFeedbackResponse(response) || {};
    },

    checkFeedbackResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setComments', response.data.data);
          return response.data.data.reverse();
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
    comments() {
      console.log(this.$store.getters.getComments);
      return this.$store.getters.getComments;
    },
  },
  created() {
    console.log('createdHook');
    this.init(this.userId);
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
