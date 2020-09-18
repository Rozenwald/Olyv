<template lang="pug">
  cost-bottom-sheet(:halfY="0.5")
    v-text-field.cost-field(
      solo
      placeholder="Цена"
      hide-details
      suffix="Руб"
      type="number"
      v-model="cost"
      ref="costInput")
    .btn-panel
      .btn-cancel
        v-btn(text v-text="'Отмена'" @click="cancel")
      .btn-accept
        v-btn(text v-text="'Ок'" @click="accept")
</template>

<script>
import CostBottomSheet from './CostBottomSheet.vue';

export default {
  name: 'cost-sheet',
  components: {
    CostBottomSheet,
  },
  data() {
    return {
      cost: null,
    };
  },
  methods: {
    cancel() {
      this.$store.dispatch('setCostSheetStatus', 'close');
    },

    accept() {
      this.$store.dispatch('setCost', this.cost);
      this.cancel();
    },
  },
  mounted() {
    this.cost = this.$store.getters.getCost;
    this.$refs.costInput.focus();
  },
  beforeDestroy() {
    this.$refs.costInput.blur();
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
