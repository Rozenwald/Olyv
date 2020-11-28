<template lang="pug">
    v-dialog(
        v-model="visible"
        transition="false"
        noClickAnimation=false)
      .dialog-text
        v-row(align='center' justify="center")
          v-card-title.dialog-text-title {{dialogTitle}}
          v-card-text.dialog-text-text {{dialogText}}
      .dialog-btn
        v-row.dialog-btn-center(align='center' justify="space-around")
          v-btn.dialog-btn-center-action(v-show="secondBtn"
                            fab x-large
                            outlined
                            @click='actionSecondBtn')
            v-icon close
          v-btn.dialog-btn-center-action(v-show="firstBtn"
                            fab x-large
                            outlined
                            @click='actionFirstBtn')
            v-icon done
</template>

<script>

export default {
  name: 'dialog',
  data() {
    return {
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    route() {
      this.showDialog = false;
      this.$router.push('auth');
    },
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
    padding-top 5px
    padding-bottom 15px;
      &-title{
      }
      &-text{
      }
  }
  .dialog-btn {
    width inherit
    position absolute
    right 0
    left 0
    bottom 75px

    &-center {
      background-color transparent !important;

      &-action {
        background #fff
        font-size: 20px !important
        color #FFA967 !important
      }
    }
  }
</style>
