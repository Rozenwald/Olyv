<template lang="pug">
    v-dialog(
        v-model="visible")
      .dialog-text
        v-row(align='center' justify="center")
          v-card-title.dialog-text-title {{dialogTitle}}
          v-card-text.dialog-text-text {{dialogText}}
      v-row.dialog-btn(align='center' justify="space-around")
          v-btn.dialog-btn-action(v-show="firstBtn"
                            x-large
                            rounded
                            depressed
                            color='#56D68B'
                            @click='actionFirstBtn')
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

export default {
  name: 'Dialog',
  data() {
    return {
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
  },
  computed: {
    visible: {
      get() {
        return this.$store.getters.getVisibleDialog;
      },
      set(val) {
        this.$store.dispatch('setVisibleDialog', val);
      },
    },
    firstBtn() {
      return this.$store.getters.getFirstButton;
    },
    secondBtn() {
      return this.$store.getters.getSecondButton;
    },
    actionFirstBtn() {
      return this.$store.getters.getFirstBtnFunction;
    },
    actionSecondBtn() {
      return this.$store.getters.getSecondBtnFunction;
    },
    dialogTitle() {
      return this.$store.getters.getDialogTitle;
    },
    dialogText() {
      return this.$store.getters.getDialogText;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .row{
    margin 0 !important;
    background-color #fff !important;
  }
  .dialog-text {
    position relative
    background-color #fFf
    padding 5px;
      &-title{}
      &-text{}
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
