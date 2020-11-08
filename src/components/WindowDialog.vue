<template lang="pug">
    v-dialog(v-model="visible")
      .mainDialog
        v-row(align='center' justify="center")
          v-card-title.titleDialog {{dialogTitle}}
          v-card-text#ModalRulesText {{dialogText}}
      .btnContainer
        v-row.dialogWindow(align='center' justify="space-around")
          v-btn.buttonColor(v-show="textFirstBtn" fab x-large) {{textFirstBtn}}
          v-btn.buttonColor(v-show="textSecondBtn" fab x-large) {{textSecondBtn}}

</template>

<script>
export default {
  name: 'window-dialog',
  data() {
    return {
    };
  },
  props: {
    show: Boolean,
  },
  computed: {
    visible() {
      return this.$store.getters.getVisibleDialog;
    },
    textFirstBtn() {
      return this.$store.getters.getFirstButtonText;
    },
    textSecondBtn() {
      return this.$store.getters.getSecondButtonText;
    },
    dialogTitle() {
      return this.$store.getters.getDialogTitle;
    },
    dialogText() {
      return this.$store.getters.getDialogText;
    },
  },
  methods: {
    route() {
      this.showDialog = false;
      this.$router.push('auth');
    },
  },
};
</script>

<style lang="stylus" scoped>
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
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-size: 12px !important
    color #FFF !important
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
