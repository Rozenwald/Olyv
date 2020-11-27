<template lang="pug">
  v-row(ref='errorIcon' align='start' justify='end')
    v-icon(color="#FF0000" v-show="show" @click="errorChat").error-icon error_outline
    .card(align='end' justify='start')
      .card-message
        .card-message-text(lang="ru") {{msg.text}}
      .card-time
        .card-time-text {{hours}}:{{minutes}}
</template>

<script>
export default {
  name: 'right-msg',
  data() {
    return {
      message: null,
    };
  },
  props: {
    msg: Object,
    show: Boolean,
    element: Number,
  },
  methods: {
    errorChat() {
      this.errorMsg = {
        element: this.msg.element,
        show: true,
      };
      this.$store.dispatch('showChatDialog', this.errorMsg);
      this.$store.dispatch('textForChatDialog', this.msg.text);
    },
  },
  computed: {
    errorShow() {
      return this.$store.getters.getErrorShow;
    },
    time() {
      return new Date(this.msg.ofCreateDate);
    },
    hours() {
      return this.time.getHours() <= 9 ? `0${this.time.getHours()}` : this.time.getHours();
    },
    minutes() {
      return this.time.getMinutes() <= 9 ? `0${this.time.getMinutes()}` : this.time.getMinutes();
    },
  },
};
</script>

<style lang="stylus" scoped>
  .card {
    display inline-block
    padding 5px 10px
    margin-top 3px
    background-color #C9F0D9
    border-radius 15px 15px 0px 15px
    font-size 14px
    max-width 75%

    &-message {
      display inline-block
      vertical-align:bottom
      max-width 100%
      text-align left
      float: left
      hyphens none
      &-text {
        max-width 100%
        word-wrap break-word !important
        word-break normal
        white-space pre-line
        hyphens none
      }
    }
    &-time {
      display inline-block
      vertical-align:bottom
      text-align right
      max-width 100%
      padding-left 5px
      font-size 9px
      &-text {
        vertical-align:bottom
      }
    }
  }
  .error-icon {
    margin-right 5px
  }
</style>
