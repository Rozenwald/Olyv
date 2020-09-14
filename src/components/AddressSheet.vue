<template lang="pug">
  swipeable-bottom-sheet(:halfY="0.5")
</template>

<script>
import SwipeableBottomSheet from './SwipeableBottomSheet.vue';

export default {
  name: 'address-sheet',
  components: {
    SwipeableBottomSheet,
  },
};
</script>
