<template lang="pug">
  .header
    v-row.avatar(align='center' justify='center')
      v-skeleton-loader(type="avatar" :loading="!hasData")
        v-row.avatar-wrp(@click="actionPhoto")
          avatar(size="100" :src="photo")
    v-row.name(align='center' justify='center')
      v-skeleton-loader(type="text" :loading="!hasData" width="90")
        span {{name}} {{lastname}}
    v-row.ratting(align='center' justify='center')
      v-skeleton-loader(type="text" :loading="!hasData" width="70")
        v-rating(
          :length="5"
          readonly
          :half-increments="true"
          dense
          color="#FFCA10"
          background-color="#FFCA10"
          size="14"
        )
    user-profile-subheader(v-show="false")
    v-row.actions(align='center' justify='center')
      v-btn.edit-data(
        text
        v-show="Object.keys(user).length && user.name == null"
        v-text="'Редактировать данные'"
        @click='route("setUserData")'
      )
      v-btn.go-verification(
        text
        v-text="'Стать исполнителем'"
        v-show="user.verification == 'notCompleted' && user.name != null && !comment"
        @click='route("verification")'
      )
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import SvgIcon from '../SvgIcon.vue';
import Avatar from '../Avatar.vue';
import PopupMenuProfile from './PopupMenuProfile.vue';
import UserProfileSubheader from './UserProfileSubheader.vue';
import camera from '../../scripts/device-modules/camera';
import file from '../../scripts/device-modules/file';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'user-profile-header',
  components: {
    SvgIcon,
    Avatar,
    PopupMenuProfile,
    UserProfileSubheader,
  },
  data() {
    return {
      file: null,
    };
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },

    ...mapActions('actionPhotoDialog', [
      'setStatus',
      'setSourceType',
    ]),

    actionPhoto() {
      this.setStatus(true);
    },

    choosePhoto(innerOptions) {
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
            this.$router.push('auth'),
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

    getUserData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'my',
          token: this.token,
        })
        .then((response) => (this.checkUserData(response)))
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

    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push('auth'),
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
    },

    getOptions(srcType) {
      // eslint-disable-next-line no-undef
      const options = { destinationType: Camera.DestinationType.DATA_URL };

      if (srcType === 'gallery') {
        // eslint-disable-next-line no-undef
        options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      }

      if (srcType === 'camera') {
        // eslint-disable-next-line no-undef
        options.sourceType = Camera.PictureSourceType.CAMERA;
      }

      return options;
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },

    token() {
      return this.$store.getters.getToken;
    },

    hasData() {
      return this.$store.getters.hasData;
    },

    photo() {
      if (!this.hasData) {
        return null;
      }
      if (!this.user.photo.length) {
        return null;
      }
      const url = this.user.photo[this.user.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
    },

    name() {
      if (this.user.name == null) {
        return this.user.email;
      }
      return this.user.name;
    },

    lastname() {
      return this.user.lastname;
    },

    comment() {
      if (this.$store.getters.getComment == null) {
        return '';
      }
      return this.$store.getters.getComment;
    },

    sourceType: {
      get() { return this.$store.state.actionPhotoDialog.sourceType; },
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

      if (this.sourceType === 'camera') {
        this.choosePhoto(options);
        logger.log('open camera');
      }

      if (this.sourceType) {
        this.sourceType = null;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .row {
    margin 0
  }

  .header {
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    margin-bottom 12px
  }

  .avatar, .ratting {
    margin-bottom 15px
  }

  .actions button {
    width 100%
    margin-top 15px
    margin-bottom -12px
    border-radius 0
  }

  .actions {
    margin 0 -12px
  }

  .name, .ratting {
    line-height 1.2
  }

  .name {
    font-weight bold
  }

  .v-skeleton-loader__text{
    height 36px !important
    border-radius 0 !important
  }
</style>
