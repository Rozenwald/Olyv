<template lang="pug">
  v-dialog(v-model="showDialog")
    .hui fdsfdsfsdfgfdgfdsdf
</template>

<script>
export default {
  name: 'login-dialog',
  data() {
    return {
      show: false,
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.getters.isVisibleLoginDialog;
      },
      set(val) {
        this.$store.dispatch('showLoginDialog', val);
      },
    },
  },
};
</script>
