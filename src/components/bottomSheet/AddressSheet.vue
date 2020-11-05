<template lang="pug">
  v-bottom-sheet(v-model="open" fullscreen)
    v-sheet(:height='height' scrollable)
      .title-sheet
        v-row(
          align='center'
          justify='center'
          v-if="currentPosition.lat") Адрес

        v-list-item.header(dense @click="checkLocationAuthorization(0)" v-else)
          v-list-item-content
            v-list-item-title Разрешите доступ к геолокации
            v-list-item-subtitle Сервис поиска станет удобнее
          v-list-item-action
            svg-icon(name='RightArrow' width="8" height="12") //TODO: заменить на иконку vuetify

      v-divider

      v-text-field.adress-field(
        solo
        hide-details
        clearable
        v-model="address"
        ref="adressInput"
        prepend-inner-icon="search")
          template(v-slot:append)
            v-divider.vertical-divider(vertical)
            v-icon(
              v-text="currentPosition.lat ? 'gps_fixed' : 'gps_off'"
              @click="address = getCurrentPosition()")

      .suggestions-list(:style="{height: height - 170 + 'px'}")
        v-list-item(
            v-for="suggestion in suggestionsData"
            :key="randomIndex()"
            @click="clickSuggestion(suggestion)")
          v-list-item-content
            v-list-item-title {{suggestion.value}}

      v-row.panel(align='center', justify='space-between')
        v-btn(text v-text="'Отмена'" @click="cancel")
        v-btn(text v-text="'Ок'" @click="accept")
</template>

<script>
import suggestions from '../../scripts/dadata/suggestions';
import locationPermissions from '../../scripts/locationPermissions';
import dataParse from '../../scripts/dadata/dataParse';
import SvgIcon from '../SvgIcon.vue';

export default {
  name: 'address-sheet',
  components: {
    SvgIcon,
  },
  data() {
    return {
      address: null,
      addressData: {},
      suggestionsData: [],
      height: null,
    };
  },
  methods: {
    cancel() {
      this.addressData = {};
      this.$store.dispatch('setAddressSheetStatus', false);
    },

    accept() {
      this.$store.dispatch('setAddressData', this.addressData);
      this.cancel();
    },

    randomIndex() {
      const abc = 'abcdefghijklmnopqrstuvwxyz';
      let rs = '';
      while (rs.length < 5) {
        rs += abc[Math.floor(Math.random() * abc.length)];
      }
      return rs;
    },

    clickSuggestion(data) {
      const positionInfo = dataParse.parse(data);
      this.addressData = positionInfo;
      this.accept();
    },

    getCurrentPosition() {
      if (!this.currentPosition.lat) {
        this.checkLocationAuthorization(0);
        return null;
      }

      this.addressData = this.currentPosition;

      if (!this.currentPosition.value) {
        return 'Мое местоположение';
      }

      return this.currentPosition.value;
    },

    checkLocationAuthorization(count) {
      locationPermissions.checkLocationAuthorization(count);
    },

    buttonBack(e) {
      e.preventDefault();
      this.open = false;
    },
  },
  computed: {
    open: {
      get() {
        return this.$store.getters.getAddressSheetStatus;
      },
      set(status) {
        this.$store.dispatch('setAddressSheetStatus', status);
      },
    },

    currentPosition() {
      return this.$store.getters.getCurrentPosition;
    },

    locationPermissionCount() {
      return this.$store.getters.getLocationPermissionCount;
    },
  },
  watch: {
    async address() {
      const response = await suggestions.getSuggestions({
        query: this.address,
        locationsBoost: {
          kladr_id: this.currentPosition.kladr_id,
        },
      });
      this.suggestionsData = response.data.suggestions;
    },
  },
  created() {
    this.height = window.innerHeight;

    window.addEventListener('resize', () => {
      this.height = window.innerHeight;
    });

    if (!this.locationPermissionCount) {
      this.checkLocationAuthorization(this.locationPermissionCount);
      this.$store.dispatch('setLocationPermissionCount', this.locationPermissionCount + 1);
    } else if (this.currentPosition.lat) {
      this.checkLocationAuthorization(0);
    }

    document.addEventListener('backbutton', this.buttonBack, false);
  },
  mounted() {
    this.addressData = this.$store.getters.getAddressData;
    this.address = this.addressData.value;
    // this.$refs.adressInput.focus();
  },
  beforeDestroy() {
    this.$refs.adressInput.blur();
    document.removeEventListener('backbutton', this.buttonBack, false);
  },
};
</script>

<style lang="stylus" scoped>
  .v-sheet {
    border-radius 0
  }

  .title-sheet {
    height 48px
    .row {
      height 48px
    }
  }

  .header {
    max-height 48px
    .v-list-item__content {
      max-height 48px
      text-align center
    }
    .v-list-item__action {
      min-width 0
    }
  }

  .adress-field {
    margin-top 15px
  }

  .vertical-divider {
    margin-right 5px
  }

  .panel {
    position fixed
    width 100%
    margin 0
    padding 12px
    bottom 0
  }

  .suggestions-list {
    overflow scroll
  }

</style>
