  <template lang="pug">
    v-dialog.dialog(v-model="visible")
      v-row(align='center' justify="center")
        v-card-title.dialog-title {{dialogTitle}}
      v-row(align='center' justify="center")
        v-rating.rating(
            v-model="rating"
            half-increments
            background-color="warning lighten-1"
            color="warning"
            length="5"
            value="4.5")
      v-row(align='center' justify="center")
        v-textarea.dialog-text(
            solo
            outlined
            flat
            hide-details
            placeholder=' Здесь вы можете оставить свой отзыв'
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
              @click='actionSecondBtn')
            v-icon close
</template>

<script>
import Feedback from '../classes/Models/Feedback';

export default {
  name: 'FeedbackDialog',
  components: {
    FeedbackAPI,
  },
  data() {
    return {
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    async addFeedback() {
      const raw = await this.$root.feedbackAPI.receiveMyAwait();

      const rawData = raw.data.data;
      rawData.foreach((el) => {
        const feedback = new Feedback(el);
        arr.push( );
      });
      const res = await this.$root.feedbackAPI.add()
    },
  },
  computed: {
    order() {
      console.log(this.$store.getters.getMyOrder);
      return this.$store.getters.getMyOrder;
    },
    visible: {
      get() {
        return this.$store.getters.getFeedbackVisibleDialog;
      },
      set(val) {
        this.$store.dispatch('setFeedbackVisibleDialog', val);
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
