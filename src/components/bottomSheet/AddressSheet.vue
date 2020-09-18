<template lang="pug">
  address-bottom-sheet(:halfY="0.5")
    v-container
      v-text-field.adress-field(
        solo
        placeholder="Адрес"
        hide-details
        v-model="address"
        ref="adressInput")
      .btn-panel
        .btn-cancel
          v-btn(text v-text="'Отмена'" @click="cancel")
        .btn-accept
          v-btn(text v-text="'Ок'" @click="accept")
</template>

<script>
import AddressBottomSheet from './AddressBottomSheet.vue';

export default {
  name: 'address-sheet',
  components: {
    AddressBottomSheet,
  },
  data() {
    return {
      address: null,
    };
  },
  methods: {
    cancel() {
      this.$store.dispatch('setAddressSheetStatus', 'close');
    },

    accept() {
      this.$store.dispatch('setAddress', this.address);
      this.cancel();
    },
  },
  mounted() {
    this.address = this.$store.getters.getAddress;
    this.$refs.adressInput.focus();
  },
  beforeDestroy() {
    this.$refs.adressInput.blur();
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
