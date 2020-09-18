<template lang="pug">
  description-bottom-sheet(:halfY="0.5")
    v-container
      v-textarea.description-field(
        solo
        rows="4"
        no-resize
        placeholder="Описание"
        hide-details
        v-model="description"
        ref="descriptionInput"
      )
      .btn-panel
        .btn-cancel
          v-btn(text v-text="'Отмена'" @click="cancel")
        .btn-accept
          v-btn(text v-text="'Ок'" @click="accept")
</template>

<script>
import DescriptionBottomSheet from './DescriptionBottomSheet.vue';

export default {
  name: 'description-sheet',
  components: {
    DescriptionBottomSheet,
  },
  data() {
    return {
      description: null,
    };
  },
  methods: {
    cancel() {
      this.$store.dispatch('setDescriptionSheetStatus', 'close');
    },

    accept() {
      this.$store.dispatch('setDescription', this.description);
      this.cancel();
    },
  },
  mounted() {
    this.description = this.$store.getters.getDescription;
    this.$refs.descriptionInput.focus();
  },
  beforeDestroy() {
    this.$refs.descriptionInput.blur();
  },
};
</script>

<style lang="stylus" scoped>
  .btn-cancel, .btn-accept {
    position fixed
    bottom 12px
  }

  .btn-accept {
    right 12px
  }
</style>
