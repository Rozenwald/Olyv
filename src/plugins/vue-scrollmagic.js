import Vue from 'vue';
import VueScrollmagic from 'vue-scrollmagic';

Vue.use(VueScrollmagic, {
  vertical: true,
  globalSceneOptions: {
    triggerHook: 'onLeave',
    duration: '100%',
  },
  loglevel: 2,
  refreshInterval: 100,
});

export default VueScrollmagic;
