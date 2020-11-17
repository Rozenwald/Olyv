<template lang="pug">
  l-map(
    ref='map'
    :zoom="zoom"
    :center="location"
    :options="mapOptions"
    @fullscreenchange="fullscreenChange"
    style="z-index: 1")
    l-tile-layer(:url="url")
    l-marker(:lat-lng="location" :icon="icon")
    l-control-fullscreen(position="topleft")
</template>

<script>
import { latLng, icon } from 'leaflet';
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LControl,
} from 'vue2-leaflet';
import LControlFullscreen from 'vue2-leaflet-fullscreen';
// eslint-disable-next-line no-unused-vars
import LeafletFullscreen from 'leaflet-fullscreen';

export default {
  name: 'map-view',
  components: {
    latLng,
    icon,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LControl,
    LControlFullscreen,
  },
  props: {
    lat: Number,
    lon: Number,
  },
  data() {
    return {
      zoom: 18,
      iconSize: 100,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      mapOptions: {
        zoomSnap: 0.5,
      },
      icon: icon({
        // eslint-disable-next-line global-require
        iconUrl: require('../assets/icons/location-marker.svg'),
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
      isFullscreenCount: 0,
    };
  },
  methods: {
    fullscreenChange() {
      if (this.fullscreen && !this.isFullscreenCount) {
        this.isFullscreenCount += 1;
        return null;
      }

      if (this.fullscreen) {
        this.$store.dispatch('fullscreen', false);
        this.isFullscreenCount = 0;
        return null;
      }

      return null;
    },
  },
  computed: {
    location() {
      return latLng(this.lat, this.lon);
    },
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
    fullscreen() {
      return this.$store.getters.fullscreen;
    },
  },
  watch: {
    fullscreen() {
      console.log(this.fullscreen);
      if (this.fullscreen) {
        this.$refs.map.mapObject.toggleFullscreen();
      }
    },
  },
};
</script>
