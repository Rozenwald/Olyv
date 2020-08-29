<template lang="pug">
v-dialog(v-model="showDialog")
  v-card
    v-card-title.headline(v-text="title")
    v-card-text(v-text="error")
    v-card-actions
      v-spacer
      v-btn(color="green darken-1" text @click="showDialog = false") Ок
</template>

<script>
export default {
  name: 'error-dialog',
  data() {
    return {
      title: 'Ошибка',
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    showDialog: {
      get() {
        if (this.error) {
          return true;
        }
        return false;
      },
      set(val) {
        if (!val) {
          this.$store.dispatch('setError', null);
        }
      },
    },
  },
};
</script>
