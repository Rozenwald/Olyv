<template lang="pug">
  v-container
    v-textarea.keyword-input(solo
              rows="4"
              no-resize
              placeholder="Ключевые слова"
              hide-details)
    v-row.btn-wrapper(align='center' justify='center')
        v-btn.btn-save(rounded @click="checkForm") Сохранить
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'Chat',
  components: {
    SvgIcon,
    axios,
  },
  data() {
    return {
    };
  },
  methods: {
  },

  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },

  mounted() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', true);
  },
  beforeDestroy() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', true);
  },
  created() {
  },
};
</script>

<style lang="stylus" scoped>
  .keyword-input{
    margin-bottom 10px
    margin-top 10px
  }
  .btn-save{
    margin-top 10px
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 240px
    box-shadow none
  }

</style>
