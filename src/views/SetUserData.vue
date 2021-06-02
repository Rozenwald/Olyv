<template lang="pug">
  v-container
    .set-user-data
      v-row(align='center' justify='center')
        v-skeleton-loader(type="avatar" :loading="!hasData")
          v-row.avatar-wrp(@click="actionPhoto")
            avatar(:src="src" size="100" @click="actionPhoto")
      v-skeleton-loader(type="text" :loading="!hasData")
        v-text-field.edit-data(
          solo
          color="#65686C"
          hide-details="auto"
          v-model="firstName"
          placeholder="Имя"
        )
      v-skeleton-loader(type="text" :loading="!hasData")
        v-text-field.edit-data(
          solo
          color="#65686C"
          hide-details="auto"
          v-model="lastName"
          placeholder="Фамилия"
        )
      v-skeleton-loader(type="text" :loading="!hasData")
        v-textarea.edit-data(
          solo
          color="#65686C"
          name="input-7-4"
          hide-details="auto"
          v-model="description"
          placeholder="Описание"
        )
      v-row.btn-wrapper(align='center' justify='center')
        v-btn.btn-save(
          rounded
          @click="checkForm"
          :loading="loading"
          :disabled="loading") Сохранить
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
// eslint-disable-next-line import/no-cycle
import router from '../router';
import store from '../store';
import SvgIcon from '../components/SvgIcon.vue';
import Avatar from '../components/Avatar.vue';
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';
import camera from '../scripts/device-modules/camera';
import file from '../scripts/device-modules/file';
import dialogMessages from '../scripts/dialogMessages';

export default {
  name: 'SetUserData',
  components: {
    axios,
    store,
    SvgIcon,
    Avatar,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      file: null,
      windowHeight: null,
      description: null,
      loading: false,
    };
  },
  methods: {
    checkForm() {
      this.loading = true;

      if (this.firstName == null) {
        this.loading = false;
        this.$router.back();
        return undefined;
      }

      if (this.firstName.length === 0) {
        this.loading = false;
        this.$router.back();
        return undefined;
      }

      this.sendData();
      return undefined;
    },

    sendData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'update',
          submethod: 'nameLastname',
          token: this.token,
          name: this.firstName,
          lastname: this.lastName,
        })
        .then((response) => (this.checkResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(error);
        });
    },

    updateUserInfo() {
      axios
        .post(`${this.$baseUrl}api/v1/private/userCard`, {
          method: 'update',
          submethod: 'info',
          token: this.token,
          name: this.firstName,
          lastname: this.lastName,
        })
        .then((response) => (this.checkUpdateUserInfo(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(error);
        });
    },

    checkUpdateUserInfo(response) {
      switch (response.data.status) {
        case 'success':
          this.updateDescription();
          break;
        case 'notAuthenticate':
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
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(response);
      }
    },

    updateDescription() {
      axios
        .post(`${this.$baseUrl}api/v1/private/userCard`, {
          method: 'update',
          submethod: 'description',
          description: this.description,
          token: this.token,
        })
        .then((response) => (this.checkDescription(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(error);
        });
    },

    checkDescription(response) {
      switch (response.data.status) {
        case 'success':
          this.getUserData();
          break;
        case 'notAuthenticate':
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(response);
      }
    },

    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.updateUserInfo();
          break;
        case 'notAuthenticate':
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(response);
      }
    },

    getUserCard() {
      axios
        .post(`${this.$baseUrl}api/v1/private/userCard`, {
          method: 'receive',
          submethod: 'current',
          token: this.token,
        })
        .then((response) => this.checkUserCard(response))
        .catch((error) => {
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );

          logger.log(error);
        });
    },

    checkUserCard(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUserCard', response.data.data);
          this.$router.back();
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(response);
      }
      this.loading = false;
    },

    getUserData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'my',
          token: this.token,
        })
        .then((response) => (this.checkUserData(response)))
        .catch((error) => {
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(error);
        });
    },

    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          if (!this.file) this.getUserCard();
          this.file = null;
          break;
        case 'notAuthenticate':
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          this.loading = false;
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(response);
      }
    },

    ...mapActions('actionPhotoDialogAvatar', [
      'setStatusPhotoDialogAvatar',
      'setSourceType',
    ]),

    actionPhoto() {
      console.log(this.$store.getters.getStatusPhotoDialogAvatar);
      this.setStatusPhotoDialogAvatar(true);
      console.log(this.$store.getters.getStatusPhotoDialogAvatar);
      this.$store.dispatch('setStatusPhotoDialogAvatar', true);
      console.log(this.$store.getters.getStatusPhotoDialogAvatar);
    },

    choosePhoto(innerOptions) {
      // eslint-disable-next-line no-undef
      camera.open(innerOptions)
        .then((imageUrl) => {
          logger.log(imageUrl);
          const blob = file.dataURLtoBlob(`data:image/jpeg;base64,${imageUrl}`);
          logger.log(blob);
          this.file = blob;
          if (this.file) this.sendPhoto();
        })
        .catch((error) => {
          logger.log(error);
        });
    },

    sendPhoto() {
      logger.log(this.file);
      // eslint-disable-next-line prefer-const
      let data = new FormData();
      data.append('token', this.token);
      data.append('method', 'update');
      data.append('photo', this.file);
      data.append('submethod', 'photo');
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, data)
        .then((response) => (this.checkPhoto(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorPhoto'),
            true,
            false,
          );
          logger.log(error);
        });
    },

    checkPhoto(response) {
      logger.log(response);
      switch (response.data.status) {
        case 'success':
          this.getUserData();
          break;
        case 'invalidPhoto':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('invalidPhoto'),
            true,
            false,
          );
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorPhoto'),
            true,
            false,
          );
          break;
      }
    },

    route(route) {
      this.$router.push(route);
    },

    getOptions(srcType) {
      // eslint-disable-next-line no-undef
      const options = { destinationType: Camera.DestinationType.DATA_URL };

      if (srcType === 'gallery') {
        // eslint-disable-next-line no-undef
        options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      }

      if (srcType === 'camera-photo') {
        // eslint-disable-next-line no-undef
        options.sourceType = Camera.PictureSourceType.CAMERA;
      }

      return options;
    },
  },
  created() {
    this.firstName = this.user.name;
    this.lastName = this.user.lastname;
    this.description = this.userCard.description;

    this.$store.commit('setTitle', 'Личный кабинет');

    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      if (window.innerHeight < this.windowHeight) {
        this.$store.dispatch('showBottomNavigation', false);
      } else {
        this.$store.dispatch('showBottomNavigation', true);
      }
    });
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },

    token() {
      return this.$store.getters.getToken;
    },

    src() {
      if (!this.hasData) {
        return null;
      }

      if (!this.user.photo.length) {
        return null;
      }

      const url = this.user.photo[this.user.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
    },

    user() {
      return this.$store.getters.getUser;
    },

    userCard() {
      return this.$store.getters.getUserCard;
    },

    hasData() {
      return this.$store.getters.hasData;
    },

    sourceType: {
      get() { return this.$store.state.actionPhotoDialogAvatar.sourceType; },
      set(value) { this.setSourceType(value); },
    },
  },
  watch: {
    sourceType() {
      const options = this.getOptions(this.sourceType);

      if (this.sourceType === 'gallery') {
        this.choosePhoto(options);
        logger.log('open gallery');
      }

      if (this.sourceType === 'camera-photo') {
        this.choosePhoto(options);
        logger.log('open camera');
      }

      if (this.sourceType) {
        this.sourceType = null;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!store.getters.isAuth) {
      next(from.name);
      dialog.open(
        dialogMessages.getTitle('needToAuth'),
        dialogMessages.getBody('needToAuth'),
        true,
        true,
        () => router.push({ name: 'auth' }),
      );
    } else {
      next();
    }
  },
};
</script>

<style lang="stylus" scoped>

  .set-user-data {
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    margin-bottom 12px
  }

  .edit-data {
    margin 12px 0 0 !important
  }

  .btn-wrapper{
    margin-top 24px
  }

  .btn-save{
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 240px
    box-shadow none
  }

  input[type="file"]{
    position absolute
    left -500px
  }
</style>
