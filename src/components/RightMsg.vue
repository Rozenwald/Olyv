<template lang="pug">
  v-row.card-wrp(ref='errorIcon' align='start' justify='end')
    v-icon(color="#FF0000" v-show="show" @click="errorChat").error-icon error_outline
    .msg-card
      .text-wrp(align='center' justify='left')
        .text(lang="ru") {{msg.text}}
      .time-wrp
        .time {{hours}}:{{minutes}}
</template>

<script>
import ErrorChatDialog from './ErrorChatDialog.vue';

export default {
  name: 'right-msg',
  props: {
    msg: Object,
    // show: Boolean,
  },
  data: () => ({
    show: true,
  }),
  components: {
    ErrorChatDialog,
  },
  methods: {
    errorChat() {
      this.$store.dispatch('showChatDialog', true);
    },
  },
  computed: {
    time() {
      return new Date(this.msg.ofCreateDate);
    },
    hours() {
      return this.time.getHours() === '0' ? '00' : this.time.getHours();
    },
    minutes() {
      // eslint-disable-next-line radix
      return this.time.getMinutes() <= 9 ? `0${this.time.getMinutes()}` : this.time.getMinutes();
    },
  },
};
</script>

<style lang="stylus" scoped>
  .msg-card {
    padding 5px
    margin-top 2px
    margin-bottom 2px
    background-color #C9F0D9
    border-radius 10px 10px 0px 10px
    font-size 12px
    max-width 50%
    text-align right
  }

  .text-wrp, .text {
    text-align left
    word-wrap break-word
    word-break break-all
    hyphens auto
  }

  .time-wrp {
    padding-left 5px
    font-size 10px
  }

  .msg-card, .time-wrp, .text-wrp  {
    display inline-block
    vertical-align bottom
  }

  .error-icon {
    margin-right 5px
  }
</style>
