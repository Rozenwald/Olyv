<template lang="pug">
  v-snackbar(
    centered
    v-model="showSnackbar"
    :timeout = 'timeout') {{text}}
</template>

<script>
export default {
  name: 'snackbar',
  methods: {
  },
  computed: {
    showSnackbar: {
      get() {
        return this.$store.getters.getSnackbarVisible;
      },
      set(val) {
        this.$store.dispatch('setSnackbarVisible', val);
      },
    },
    timeout() {
      return this.$store.getters.getSnackbarTimeout;
    },
    text() {
      return this.$store.getters.getSnackbarText;
    },
  },
};
</script>
<style lang="stylus" scoped>
  .dialog-card{
  }
  .button-dialog{

  }
</style>
