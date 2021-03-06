<template lang="pug">
    v-dialog.dialog(v-model="visible")
      v-row(align='center' justify="center")
        v-card-title.dialog-title {{dialogTitle}}
      v-row(align='center' justify="center")
        v-rating.rating(
            v-model="rating"
            background-color="warning lighten-1"
            color="warning"
            length="5"
            :value="rating")
      v-row(align='center' justify="center")
        v-textarea.dialog-text(
            v-model="comment"
            solo
            outlined
            flat
            hide-details
            placeholder='Здесь вы можете оставить свой отзыв'
            rows="1"
            auto-grow)
      v-row.dialog-btn(align='center' justify="space-around")
          v-btn.dialog-btn-action(v-show="firstBtn"
              x-large
              rounded
              depressed
              color='#56D68B'
              @click='addFeedback()')
            v-icon(color='#fff') done
          v-btn.dialog-btn-action(v-show="secondBtn"
              x-large
              rounded
              color='#56D68B'
              outlined
              @click='close()')
            v-icon close
</template>

<script>
import feedbackDialog from '../scripts/openFeedbackDialog';
import logger from '../scripts/logger';
import dialogMessages from '../scripts/dialogMessages';
import dialog from '../scripts/openDialog';

export default {
  name: 'FeedbackDialog',
  components: {
  },
  data() {
    return {
      comment: '',
      rating: 0,
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    async addFeedback() {
      const feedbackObject = {
        id: this.order._id,
        comment: this.comment,
        rating: this.rating,
      };
      const res = await this.$root.feedbackAPI.add(feedbackObject);
      return this.checkResponse(res);
    },
    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setType', 'completed');
          this.close();
          this.$store.dispatch('setSnackbarVisible', true);
          this.$store.dispatch('setSnackbarText', 'Отзыв оставлен успешно');
          break;
        case 'notExist':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notExist'),
            true,
            false,
          );
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthenticate'),
            true,
            false,
          );
          break;
        default:
          logger.log();
          break;
      }
    },
    close() {
      this.comment = null;
      this.rating = null;
      feedbackDialog.close();
    },
  },
  computed: {
    order() {
      return this.$store.getters.getMyFeedbackOrder;
    },
    visible: {
      get() {
        return this.$store.getters.getFeedbackVisibleDialog;
      },
      set(val) {
        this.$store.dispatch('setFeedbackVisibleDialog', val);
        this.comment = null;
        this.rating = null;
      },
    },
    firstBtn() {
      return this.$store.getters.getFeedbackFirstButton;
    },
    secondBtn() {
      return this.$store.getters.getFeedbackSecondButton;
    },
    actionFirstBtn() {
      return this.$store.getters.getFeedbackFirstBtnFunction;
    },
    actionSecondBtn() {
      return this.$store.getters.getFeedbackSecondBtnFunction;
    },
    dialogTitle() {
      return this.$store.getters.getFeedbackDialogTitle;
    },
    dialogText() {
      return this.$store.getters.getFeedbackDialogText;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .rating {
    background-color #fff
  }
  .row{
    margin 0 !important;
    background-color #fff !important;
  }
  .dialog-text {
    position relative
    background-color #fFf;
    margin-right 20px !important
    margin-left 20px !important
    text-align center
  }
  .dialog-title {
    position relative
    background-color #fFf;
    padding-bottom 0 !important
    text-align center;
  }
  .dialog-btn {
    padding 10px;
      &-action {
        margin 5px;
        width 80%;
        background #fff
        font-size: 20px !important
        color #56D68B !important
      }
  }
</style>
