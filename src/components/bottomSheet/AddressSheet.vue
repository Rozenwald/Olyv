<template lang="pug">
  address-bottom-sheet(:halfY="0.5")
    v-container
      vue-dadata(
        token="45f1d56a8f2e17cc4d84788a1fdab38c6d8468c7"
        :onChange="getSuggestion"
        :locationOptions="locationOptions"
      )
      v-text-field.adress-field(
        solo
        v-show="false"
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
import VueDadata from 'vue-dadata';
import AddressBottomSheet from './AddressBottomSheet.vue';

export default {
  name: 'address-sheet',
  components: {
    VueDadata,
    AddressBottomSheet,
  },
  data() {
    return {
      address: null,
      addressData: {},
      locationOptions: {
        locations: [{
          city: 'Владивосток',
        }],
      },
    };
  },
  methods: {
    cancel() {
      this.addressData = {};
      this.$store.dispatch('setAddressSheetStatus', 'close');
    },

    accept() {
      this.$store.dispatch('setAddressData', this.addressData);
      this.cancel();
    },

    getSuggestion(suggestion) {
      if (suggestion) {
        if (suggestion.data) {
          this.addressData = {
            value: suggestion.value,
            lat: suggestion.data.geo_lat,
            lon: suggestion.data.geo_lon,
          };
          this.accept();
        }
      }
    },
  },
  mounted() {
    this.addressData = this.$store.getters.getAddressData;
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
