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

        order-media-files

        v-row(align='center' justify='center')
            v-btn.create-btn(
              align-content='center'
              rounded
              @click="checkForm()"
              :loading='loading'
              :disabled='loading'
              v-text="loading ? null : isEdit ? 'Редактировать': 'Создать'"
            )
</template>

<script>
import axios from 'axios';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';
import OrderMediaFiles from '../OrderMediaFiles.vue';

export default {
  name: 'bottom-sheet',
  components: {
    OrderMediaFiles,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
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
      this.loading = true;
      if (this.addressData.value == null) {
        dialog.open(
          dialogMessages.getTitle('warning'),
          dialogMessages.getBody('errorAddress'),
          true,
          false,
        );
        this.loading = false;
        return null;
      }
      if (this.cost == null) {
        dialog.open(
          dialogMessages.getTitle('warning'),
          dialogMessages.getBody('errorCost'),
          true,
          false,
        );
        this.loading = false;
        return null;
      }
      if (!this.validCost(this.cost)) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('invalidCost'),
          true,
          false,
        );
        this.loading = false;
        return null;
      }
      if (this.description == null) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('invalidDescription'),
          true,
          false,
        );
        this.loading = false;
        return null;
      }
      if (this.description.length < 10) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('invalidDescription'),
          true,
          false,
        );
        this.loading = false;
        return null;
      }

      this.sendOrder();
      return null;
    },

    sendOrder() {
      const files = [];
      this.mediaFiles.forEach((element) => {
        files.push(element.serverData);
      });
      logger.log(files);
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
          address: this.addressData.value,
          files,
        })
        .then((response) => (this.checkResonse(response)))
        .catch((error) => {
          dialog.open(
            dialogMessages.getTitle('error'),
            this.isEdit ? dialogMessages.getBody('errorCreateOrder') : dialogMessages.getBody('errorEditOrder'),
            true,
            false,
          );
          logger.log(error);
          this.loading = false;
        });
      /* eslint-enable no-return-assign */
    },

    checkResonse(response) {
      switch (response.data.status) {
        case 'success':
          this.open = false;
          if (this.isEdit) this.$store.dispatch('isEdit', false);
          this.loading = false;
          break;
        case 'invalidCost':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('invalidCost'),
            true,
            false,
          );
          this.loading = false;
          break;
        case 'invalidDescription':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('invalidDescription'),
            true,
            false,
          );
          this.loading = false;
          break;
        case 'notAuthenticate':
          this.$store.dispatch('setBottomSheetStatus', false);
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          this.loading = false;
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            this.isEdit ? dialogMessages.getBody('errorCreateOrder') : dialogMessages.getBody('errorEditOrder'),
            true,
            false,
          );
          logger.log(response.data);
          this.loading = false;
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

    mediaFiles() {
      return this.$store.getters.getMediaFiles;
    },
  },
  watch: {
    open() {
      if (!this.open) {
        if (this.isEdit) this.$store.dispatch('isEdit', false);
        this.$store.dispatch('setAddressData', {});
        this.$store.dispatch('setDescription', null);
        this.$store.dispatch('setCost', null);
        this.$store.dispatch('setMediaFiles', []);
        this.$store.dispatch('setPhotoFiles', []);
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
    margin-bottom 12px !important
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
