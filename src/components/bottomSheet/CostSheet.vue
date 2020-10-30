<template lang="pug">
  v-bottom-sheet(v-model="open")
    v-sheet
      v-text-field.cost-field(
        solo
        placeholder="Цена"
        hide-details
        suffix="Руб"
        type="number"
        v-model="cost"
        ref="costInput")

      v-item-group(mandatory)
        v-row(no-gutters)
          v-col(col="6")
            v-item(v-slot="{ active, toggle }")
              v-card(@click="toggle" :class="{'active-card': active}")
                  v-row.content(align='center' justify='center' no-gutters) Наличными
          v-col(col="6")
            v-item(v-slot="{ active, toggle }")
              v-card(:class="{'active-card': active}" @click="toggle")
                v-row.content(align='center' justify='center' no-gutters) Перевод на карту

      v-row.panel(align='center', justify='space-between')
        v-btn(text v-text="'Отмена'" @click="cancel")
        v-btn(text v-text="'Ок'" @click="accept")
</template>

<script>

export default {
  data() {
    return {
      cost: null,
    };
  },
  methods: {
    cancel() {
      this.$store.dispatch('setCostSheetStatus', false);
    },

    accept() {
      this.$store.dispatch('setCost', this.cost);
      this.cancel();
    },
  },
  computed: {
    open: {
      get() {
        return this.$store.getters.getCostSheetStatus;
      },
      set(status) {
        this.$store.dispatch('setCostSheetStatus', status);
      },
    },
  },
  mounted() {
    this.cost = this.$store.getters.getCost;
  },
  beforeDestroy() {
    this.$refs.costInput.blur();
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

  .v-card {
    height 60px
    margin 12px 12px 62px 12px
    background-color none
    box-shadow none !important
    border 2px solid #a0a0a4
  }

  .active-card {
    border 2px solid #56D68B
  }

  .content {
    height inherit
  }

  .panel {
    position fixed
    width 100%
    margin 0
    padding 12px
    bottom 0
  }
</style>
