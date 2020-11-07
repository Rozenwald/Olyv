<template lang="pug">
    v-dialog(v-model="visible")
      v-row.dialogWindow(justify="center")
        v-card-title#V-card-title-rules
          span#SpanRulesM {{dialogTitle}}
        v-card-text#ModalRulesText {{dialogText}}
        v-card-actions
          v-btn(v-model="textFirstBtn" v-show="textFirstBtn") {{textFirstBtn}}
          v-btn(v-model="textSecondBtn" v-show="textSecondBtn") {{textSecondBtn}}

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
  .row{
    margin 0 !important;
    background-color #fff !important;
  }
  #modalContainer{
            margin 0
          }
</style>
