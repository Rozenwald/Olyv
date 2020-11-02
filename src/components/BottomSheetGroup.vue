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
    stateMain() {
      return this.$store.getters.getMainSheetStatus;
    },
    stateAddress() {
      return this.$store.getters.getAddressSheetStatus;
    },
    stateDescription() {
      return this.$store.getters.getDescriptionSheetStatus;
    },
    stateCost() {
      return this.$store.getters.getCostSheetStatus;
    },
  },
};
</script>
