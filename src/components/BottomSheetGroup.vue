<template lang="pug">
  .bottom-sheet-wrp
    bottom-sheet
    address-sheet(v-if="stateAddress")
    description-sheet(v-if="stateDescription")
    cost-sheet(v-if="stateCost")
</template>

<script>
import BottomSheet from './bottomSheet/BottomSheet.vue';

const AddressSheet = () => import('./bottomSheet/AddressSheet.vue');
const DescriptionSheet = () => import('./bottomSheet/DescriptionSheet.vue');
const CostSheet = () => import('./bottomSheet/CostSheet.vue');

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
      if (this.$store.getters.getAddressSheetStatus === 'open'
          || this.$store.getters.getAddressSheetStatus === 'half') {
        return true;
      }
      return false;
    },
    stateDescription() {
      if (this.$store.getters.getDescriptionSheetStatus === 'open'
          || this.$store.getters.getDescriptionSheetStatus === 'half') {
        return true;
      }
      return false;
    },
    stateCost() {
      if (this.$store.getters.getCostSheetStatus === 'open'
          || this.$store.getters.getCostSheetStatus === 'half') {
        return true;
      }
      return false;
    },
  },
};
</script>
