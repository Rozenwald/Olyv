<template lang="pug">
  #app
    v-app
      appbar
      transition(:name="transitionName" mode="out-in")
        router-view.router
      bottom-sheet-group
      bottom-navigation
      action-photo-dialog
      action-photo-dialog-avatar
      action-photo-dialog-user-gallery
      action-photo-dialog-verification
      action-file-dialog
      window-dialog
</template>

<script>
import axios from 'axios';
import WindowDialog from './components/Dialog.vue';
import dialog from './scripts/openDialog';
import logger from './scripts/logger';
import Appbar from './components/Appbar.vue';
import BottomSheetGroup from './components/BottomSheetGroup.vue';
import BottomNavigation from './components/BottomNavigation.vue';
import store from './store/index';
import 'leaflet/dist/leaflet.css';
import cordova from './plugins/cordova';
import dialogMessages from './scripts/dialogMessages';

const ActionPhotoDialog = () => import('./components/ActionPhotoDialog.vue');
const ActionPhotoDialogAvatar = () => import('./components/ActionPhotoDialogAvatar.vue');
const ActionPhotoDialogUserGallery = () => import('./components/ActionPhotoDialogUserGallery.vue');
const ActionFileDialog = () => import('./components/ActionFileDialog.vue');
const ActionPhotoDialogVerification = () => import('./components/ActionPhotoDialogVerification.vue');

export default {
  name: 'App',
  store,
  axios,
  components: {
    WindowDialog,
    Appbar,
    BottomNavigation,
    BottomSheetGroup,
    ActionPhotoDialog,
    ActionPhotoDialogAvatar,
    ActionFileDialog,
    ActionPhotoDialogUserGallery,
    ActionPhotoDialogVerification,
  },
  data() {
    return {
      prevHeight: 0,
    };
  },
  methods: {
    getUserData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'my',
          token: this.token,
        })
        .then((response) => (this.checkUserData(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialog.open('Ошибка', 'Не удалось загрузить данные о пользователе', true, false);
          logger.log(error);
        });
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
          break;
        case 'notAuthenticate':
          this.$store.dispatch('setToken', null);
          window.localStorage.removeItem('token');

          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            false,
          );
          break;
        case 'notExist':
          this.$store.dispatch('setUserCard', { _id: '123' }); //! заглушка
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          break;
      }
    },

    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          break;
        case 'notAuthenticate':
          dialog.open('Ошибка', 'Пользователь не авторизирован', true, false);
          break;
        case 'notExist':
          this.$store.dispatch('setToken', null);
          window.localStorage.removeItem('token');
          dialog.open('Ошибка', 'Не существует', true, false);
          break;
        default:
          dialog.open('Ошибка', '', true, false);
          break;
      }
    },

    openProfile(userId) {
      // eslint-disable-next-line no-underscore-dangle
      if (this.user._id === userId) this.$router.push({ name: 'customerProfile' });
      else this.$router.push({ name: 'publicProfile', params: { userId } });
    },

    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      // eslint-disable-next-line no-param-reassign
      element.style.height = this.prevHeight;

      setTimeout(() => {
        // eslint-disable-next-line no-param-reassign
        element.style.height = height;
      });
    },
    afterEnter(element) {
      // eslint-disable-next-line no-param-reassign
      element.style.height = 'auto';
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },

    transitionName() {
      return this.$store.getters.getTransitionName;
    },

    user() {
      return this.$store.getters.getUser;
    },
  },
  created() {
    cordova.listen();

    if (this.token) {
      this.getUserData();
      this.getUserCard();
    }

    this.$root.$on('openProfile', this.openProfile);
  },
  watch: {
    token() {
      if (this.token) {
        this.getUserData();
        this.getUserCard();
      }
    },
  },
};
</script>

<style lang="stylus">
  #app{
    background-color #f7f7f7;
    font-family Inter
  }
  .router{
    padding-bottom 63px+12px
    padding-top 48px+12px
  }

  .text-message .v-input__append-inner {
    align-self flex-end !important
    margin-top 0
    margin-bottom 10px
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.1s
    transition-property: height, opacity, transform
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1)
    overflow: hidden
    position fixed
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0
    transform: translate(2em, 0)
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0
    transform: translate(-2em, 0)
  }
</style>
