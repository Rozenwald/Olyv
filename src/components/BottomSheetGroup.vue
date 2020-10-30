<template lang="pug">
  .bottom-sheet-wrp
    bottom-sheet
    address-sheet(v-if="stateAddress")
    description-sheet
    cost-sheet
</template>

<script>
import BottomSheet from './bottomSheet/BottomSheet.vue';
import AddressSheet from './bottomSheet/AddressSheet.vue';
import DescriptionSheet from './bottomSheet/DescriptionSheet.vue';
import CostSheet from './bottomSheet/CostSheet.vue';

export default {
  name: 'bottom-sheet-group',
  components: {
    BottomSheet,
    AddressSheet,
    DescriptionSheet,
    CostSheet,
  },
  computed: {
    stateAddress() {
      return this.$store.getters.getAddressSheetStatus;
    },
  },
};
</script>
