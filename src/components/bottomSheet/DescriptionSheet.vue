<template lang="pug">
  v-bottom-sheet(v-model="open" fullscreen)
    v-sheet(:height='height')
      .title-sheet
        v-row(align='center' justify='center') Описание

      v-divider

      v-textarea.description-field(
        solo
        rows="4"
        no-resize
        hide-details
        v-model="description"
        ref="descriptionInput"
      )

      v-row.panel(align='center', justify='space-between')
        v-btn(text v-text="'Отмена'" @click="cancel")
        v-btn(text v-text="'Ок'" @click="accept")
</template>

<script>

export default {
  name: 'description-sheet',
  data() {
    return {
      description: null,
      height: null,
    };
  },
  methods: {
    cancel() {
      this.$store.dispatch('setDescriptionSheetStatus', false);
    },

    accept() {
      this.$store.dispatch('setDescription', this.description);
      this.cancel();
    },
  },
  computed: {
    open: {
      get() {
        return this.$store.getters.getDescriptionSheetStatus;
      },
      set(status) {
        this.$store.dispatch('setDescriptionSheetStatus', status);
      },
    },
  },
  created() {
    this.height = window.innerHeight;

    window.addEventListener('resize', () => {
      this.height = window.innerHeight;
    });
  },
  mounted() {
    this.description = this.$store.getters.getDescription;
  },
  beforeDestroy() {
    this.$refs.descriptionInput.blur();
  },
};
</script>

<style lang="stylus" scoped>
  .v-sheet {
    border-radius 0
  }

  .title-sheet {
    height 48px
    .row {
      height 48px
    }
  }

  .description-field {
    margin-top 15px
  }

  .panel {
    position fixed
    width 100%
    margin 0
    padding 12px
    bottom 0
  }
</style>
