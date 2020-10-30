<template lang="pug">
    v-bottom-sheet(v-model="open")
      v-sheet
        v-text-field.adress-field(
              solo
              placeholder="Адрес"
              hide-details
              readonly
              v-model="addressData.value"
              ref="adressInput"
              @click="openField('address')")

        v-textarea.description-field(
            solo
            rows="4"
            no-resize
            readonly
            placeholder="Описание"
            hide-details
            v-model="description"
            @click="openField('description')"
            ref="descriptionInput"
          )

        v-text-field.cost-field(
            solo
            placeholder="Цена"
            hide-details
            suffix="Руб"
            type="number"
            v-model="cost"
            readonly
            @click="openField('cost')"
            ref="costInput"
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

export default {
  name: 'bottom-sheet',
  components: {
    axios,
  },
  methods: {
    clickBtn() {
      this.error = this.checkForm();
    },

    openField(field) {
      switch (field) {
        case 'address':
          this.$store.dispatch('setAddressSheetStatus', true);
          break;
        case 'description':
          this.$store.dispatch('setDescriptionSheetStatus', true);
          break;
        case 'cost':
          this.$store.dispatch('setCostSheetStatus', true);
          break;
        default:
          break;
      }
    },

    checkForm() {
      if (this.addressData.value == null) {
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
          longitude: this.addressData.lon,
          latitude: this.addressData.lat,
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
          this.$store.dispatch('setMainSheetStatus', 'close');
          this.$store.dispatch('setAddressData', {});
          this.$store.dispatch('setDescription', null);
          this.$store.dispatch('setCost', null);
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
    open: {
      get() {
        return this.$store.getters.getMainSheetStatus;
      },
      set(status) {
        this.$store.dispatch('setMainSheetStatus', status);
      },
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

    addressData() {
      return this.$store.getters.getAddressData;
    },

    description() {
      return this.$store.getters.getDescription;
    },

    cost() {
      return this.$store.getters.getCost;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .v-sheet {
    padding 15px 12px
    border-radius 10px 10px 0 0
  }

  .adress-field {
    margin-bottom 12px !important
  }

  .description-field {
    margin-bottom 12px !important
  }

  .cost-field {
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
