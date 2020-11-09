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
              :loading="loading"
              align-content='center'
              rounded
              @click="clickBtn"
              v-text="loading ? null : isEdit ? 'Редактировать': 'Создать'"
            )
</template>

<script>
import axios from 'axios';

export default {
  name: 'bottom-sheet',
  components: {
    axios,
  },
  data() {
    return {
      loading: null,
    };
  },
  methods: {
    clickBtn() {
      this.error = this.checkForm();
    },

    openField(field) {
      document.removeEventListener('backbutton', this.buttonBack, false);
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

      this.sendOrder();

      return null;
    },

    sendOrder() {
      this.loading = true;

      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: this.isEdit ? 'update' : 'add',
          description: this.description,
          cost: this.cost,
          protect: 'no',
          id: this.id,
          longitude: this.addressData.lon,
          latitude: this.addressData.lat,
          address: 'sasa',
        })
        .then((response) => (this.checkResonse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },

    checkResonse(response) {
      this.loading = false;
      switch (response.data.status) {
        case 'invalidCost':
          this.error = 'Неверный формат цены';
          break;
        case 'invalidDescription':
          this.error = 'Описание должно быть больше 10 символов';
          break;
        case 'success':
          this.open = false;
          if (this.isEdit) this.$store.dispatch('isEdit', false);
          break;
        case 'notAuthenticate':
          this.$store.dispatch('setBottomSheetStatus', false);
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

    buttonBack(e) {
      e.preventDefault();
      this.open = false;
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

    openAddress() {
      return this.$store.getters.getAddressSheetStatus;
    },

    openDescription() {
      return this.$store.getters.getDescriptionSheetStatus;
    },

    openCost() {
      return this.$store.getters.getCostSheetStatus;
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

    isEdit() {
      return this.$store.getters.isEdit;
    },

    id() {
      return this.$store.getters.getOrderId;
    },
  },
  watch: {
    open() {
      if (!this.open) {
        if (this.isEdit) this.$store.dispatch('isEdit', false);
        this.$store.dispatch('setAddressData', {});
        this.$store.dispatch('setDescription', null);
        this.$store.dispatch('setCost', null);
        document.removeEventListener('backbutton', this.buttonBack, false);
      } else document.addEventListener('backbutton', this.buttonBack, false);
    },

    openAddress() {
      if (!this.openAddress) {
        document.addEventListener('backbutton', this.buttonBack, false);
      }
    },

    openDescription() {
      if (!this.openDescription) {
        document.addEventListener('backbutton', this.buttonBack, false);
      }
    },

    openCost() {
      if (!this.openCost) {
        document.addEventListener('backbutton', this.buttonBack, false);
      }
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
