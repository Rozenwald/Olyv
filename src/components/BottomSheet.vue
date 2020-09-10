<template lang="pug">
  swipeable-bottom-sheet(:halfY="0.5" ref="swipeableBottomSheet")
    v-container(v-show="show")
      v-text-field.adress-field(
        solo
        placeholder="Адрес"
        hide-details
        v-model="address"
        ref="adressInput"
        @focus="addressFocus = true"
        @blur="addressFocus = false")

      v-textarea.description-field(
        solo
        rows="4"
        no-resize
        placeholder="Описание"
        hide-details
        v-model="description"
        ref="descriptionInput"
        @focus="descriptionFocus = true"
        @blur="descriptionFocus = false"
      )

      v-text-field.cost-field(
        solo
        placeholder="Цена"
        hide-details
        suffix="Руб"
        type="number"
        v-model="cost"
        ref="costInput"
        @focus="costFocus = true"
        @blur="costFocus = false"
      )

      v-row(align='center' justify='center')
        v-btn.create-btn(
          align-content='center'
          rounded
          @click="clickBtn"
          v-text="'Создать'"
        )
</template>

<script>
import axios from 'axios';
import { SwipeableBottomSheet } from 'vue-swipeable-bottom-sheet';
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'bottom-sheet',
  components: {
    SwipeableBottomSheet,
    SvgIcon,
    axios,
  },
  data() {
    return {
      addressFocus: false,
      descriptionFocus: false,
      costFocus: false,
      windowHeight: null,
      description: null,
      cost: null,
      address: null,
    };
  },

  methods: {
    clickBtn() {
      this.error = this.checkForm();
    },

    checkForm() {
      if (this.address == null) {
        return 'Укажите адрес';
      }

      if (this.cost == null) {
        return 'Укажите цену';
      }

      if (!this.validCost(this.cost)) {
        return 'Неверный формат цены';
      }

      if (this.description == null) {
        return 'Описание должно быть больше 10 символов';
      }

      if (this.description.length < 10) {
        return 'Описание должно быть больше 10 символов';
      }

      this.createOrder();
      return null;
    },

    createOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'add',
          description: this.description,
          cost: this.cost,
          protect: 'no',
        })
        .then((response) => (this.checkResonse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },

    checkResonse(response) {
      switch (response.data.status) {
        case 'invalidCost':
          this.error = 'Неверный формат цены';
          break;
        case 'invalidDescription':
          this.error = 'Описание должно быть больше 10 символов';
          break;
        case 'success':
          this.$store.dispatch('setBottomSheetStatus', 'close');
          break;
        case 'notAuthenticate':
          this.$store.dispatch('setBottomSheetStatus', 'close');
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
      }
    },

    validCost(cost) {
      const regex = /\d+/;
      return regex.test(cost);
    },
  },

  computed: {
    focused: {
      get() {
        return this.$store.getters.getElFocus;
      },
      set(val) {
        this.$store.dispatch('setElFocus', val);
      },
    },

    state() {
      return this.$store.getters.getBottomSheetStatus;
    },

    show() {
      return this.$store.getters.showBottomSheet;
    },

    error: {
      get() {
        return this.$store.getters.getError;
      },
      set(val) {
        this.$store.dispatch('setError', val);
      },
    },

    token() {
      return this.$store.getters.getToken;
    },
  },

  watch: {
    focused() {
      if (!this.focused) {
        this.$refs.adressInput.blur();
        this.$refs.descriptionInput.blur();
        this.$refs.costInput.blur();
      }
    },
  },

  created() {
    this.windowHeight = window.innerHeight;

    window.addEventListener('resize', () => {
      if (window.innerHeight < this.windowHeight) {
        if ((this.addressFocus || this.descriptionFocus || this.costFocus) && this.state === 'half') {
          this.focused = true;
        }
      } else {
        this.focused = false;
      }
    });
  },
};
</script>

<style lang="stylus" scoped>
  .adress-field {
    margin-bottom 12px !important
  }

  .description-field {
    margin-bottom 12px !important
  }

  .cost-field {
    max-width 40%
    margin-bottom 30px !important
  }

  .create-btn{
    width 80%
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    box-shadow none !important
  }
</style>
