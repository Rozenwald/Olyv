<template lang="pug">
  v-btn.exit-btn(block :loading='loading' @click='exit')
    v-icon(dense color="red") exit_to_app
    span.text Выход
</template>

<script>
import auth from '../../scripts/auth/auth';

export default {
  name: 'exit-button',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    exit() {
      this.loading = true;
      auth.exit();
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  watch: {
    token() {
      if (!this.token) {
        this.loading = false;
        this.$router.replace('auth');
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .exit-btn {
    background-color #FFFFFF !important
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    text-transform none
    margin-top 10px
    margin-bottom 10px
  }

  .text{
    color red
    margin-left 5px
  }
</style>
