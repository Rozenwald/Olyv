<template lang="pug">
  .bottom-sheet-wrp
    bottom-sheet
    address-sheet(v-if="stateAddress")
    description-sheet(v-if="stateDescription")
    cost-sheet(v-if="stateCost")
    my-cost-sheet(v-if="stateMyCost")
</template>

<script>
import BottomSheet from './bottomSheet/BottomSheet.vue';

const AddressSheet = () => import('./bottomSheet/AddressSheet.vue');
const DescriptionSheet = () => import('./bottomSheet/DescriptionSheet.vue');
const CostSheet = () => import('./bottomSheet/CostSheet.vue');
const MyCostSheet = () => import('./bottomSheet/MyCostSheet.vue');

export default {
  name: 'bottom-sheet-group',
  components: {
    BottomSheet,
    AddressSheet,
    DescriptionSheet,
    CostSheet,
    MyCostSheet,
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
    stateMyCost() {
      return this.$store.getters.getMyCostSheetStatus;
    },
  },
};
</script>
