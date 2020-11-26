<template lang="pug">
    v-dialog.dialogstyle(
        v-model="visible"
        transition="false"
        noClickAnimation=false)
      .mainDialog
        v-row(align='center' justify="center")
          v-card-title.titleDialog {{dialogTitle}}
          v-card-text#ModalRulesText {{dialogText}}
      .btnContainer
        v-row.dialogWindow(align='center' justify="space-around")
          v-btn.buttonColor(v-show="secondBtn"
                            fab x-large
                            @click='actionSecondBtn')
            v-icon close
          v-btn.buttonColor(v-show="firstBtn"
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
  .dialogstyle{
    transition none !important
  }
  .v-dialog {
    transition none !important
  }
  .mainDialog {
    position relative
    background-color #fFf
    padding-top 5px
    padding-bottom 15px
  }
  .row{
    margin 0 !important;
    background-color #fff !important;
  }
  .buttonColor{
    background #fff
    font-size: 20px !important
    color #FFA967 !important
  }
  .dialogWindow{
    background-color transparent !important
  }
  .btnContainer{
    width inherit
    position absolute
    right 0
    left 0
    bottom 75px
  }
</style>
