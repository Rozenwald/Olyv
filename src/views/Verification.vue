<template lang="pug">
  v-container
    v-row.verification(align='center' justify='center' ref="wrp")
      v-sheet.center-wrp(elevation="1" v-if="!content")
        .verification-description(
          v-text="description"
          v-show="user.verification == 'notCompleted' && !content && !comment"
        )
        .comment-description(
          v-text="comment"
          v-show="comment"
        )
        .await-description(v-text="descriptionAwait" v-show="user.verification == 'await'")
        v-row.btn-load-photo-wrp(align="center" justify="center")
          v-btn.btn-load-photo(rounded @click="actionPhoto") Добавить фото

      v-sheet.selected-img-wrp(v-else)
        .img-wrp(@click="setMoreActionImg")
          v-img.img(:src="content" :width="wrpWidth")
            v-row.more-action-img(align='center' justify='center' v-show="moreActionImg")
              span(@click="actionPhoto") Загрузить заново
        v-btn.send-btn(@click="sendData") Отправить

</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import store from '../store';
import SvgIcon from '../components/SvgIcon.vue';
import camera from '../scripts/device-modules/camera';
import file from '../scripts/device-modules/file';
import dialogWindow from '../scripts/openDialog';
import logger from '../scripts/logger';

export default {
  name: 'Verification',
  components: {
    SvgIcon,
  },
  data: () => ({
    photoIsLoad: false,
    descriptionAwait: 'Ожидание верификации',
    description: 'Для получения статуса исполнителя необходимо пройти верификацию. Пожалуйста, загрузите фотографию паспорта.',
    content: '',
    wrpWidth: null,
    moreActionImg: false,
    file: null,
    error: '',
  }),
  methods: {
    setMoreActionImg(event) {
      if (event.target.tagName !== 'SPAN') {
        this.moreActionImg = !this.moreActionImg;
      }
    },

    ...mapActions('actionPhotoDialog', [
      'setStatus',
      'setSourceType',
    ]),

    actionPhoto() {
      this.setStatus(true);
    },

    choosePhoto(innerOptions) {
      // eslint-disable-next-line no-undef
      camera.open(innerOptions)
        .then((imageUrl) => {
          logger.log(imageUrl);
          this.content = `data:image/jpeg;base64,${imageUrl}`;
          const blob = file.dataURLtoBlob(`data:image/jpeg;base64,${imageUrl}`);
          logger.log(blob);
          this.file = blob;
          this.sendData();
        })
        .catch((error) => {
          dialogWindow.open('Ошибка', 'Не удалось загрузить фото', true, false);
          logger.log(error);
        });
    },

    route(route) {
      this.$router.push(route);
    },

    getOptions(srcType) {
      const options = {
        // eslint-disable-next-line no-undef
        destinationType: Camera.DestinationType.DATA_URL,
        // eslint-disable-next-line no-undef
        direction: Camera.Direction.BACK,
      };

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

    sendData() {
      // eslint-disable-next-line prefer-const
      let data = new FormData();
      data.append('token', this.token);
      data.append('method', 'add');
      data.append('photo', this.file);
      axios
        .post(`${this.$baseUrl}api/v1/private/passport`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => (this.checkResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialogWindow.open('Ошибка', 'Не удалось загрузить фото', true, false);
          logger.log(error);
        });
    },

    checkResponse(response) {
      logger.log(response);
      switch (response.data.status) {
        case 'success':
          this.getUserData();
          if (this.comment) {
            this.$store.dispatch('setComment', null);
          }
          break;
        case 'invalidPhoto':
          dialogWindow.open('Ошибка', 'Неверный формат фото', true, false);
          break;
        case 'already':
          dialogWindow.open('Ошибка', 'Вы уже отправили запрос. Пожалуйста, дождитесь ответа службы поддержки', true, false);
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          dialogWindow.open('Ошибка', 'Не удалось загрузить фото', true, false);
          logger.log(response.data);
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
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialogWindow.open('Ошибка', 'Не удалось загрузить фото', true, false);
          logger.log(error);
        });
    },

    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          this.content = '';
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showLoginDialog', true);
          break;
        default:
          dialogWindow.open('Ошибка', 'Не удалось загрузить фото', true, false);
          logger.log(response.data);
          break;
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },

    sourceType: {
      get() { return this.$store.state.actionPhotoDialog.sourceType; },
      set(value) { this.setSourceType(value); },
    },

    user() {
      return this.$store.getters.getUser;
    },

    comment() {
      return this.$store.getters.getComment;
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
  created() {
    this.$store.commit('setTitle', 'Верификация');
  },
  beforeRouteEnter(to, from, next) {
    if (!store.getters.isAuth) {
      next(from.name);
      this.$store.dispatch('showLoginDialog', true);
    } else {
      next();
    }
  },
};
</script>

<style lang="stylus" scoped>

  .container{
    height 100vh
  }

  .verification{
    margin 0 !important
    height 100%
  }

  .center-wrp {
    padding 12px
  }

  .btn-load-photo-wrp {
    margin-top 24px
  }

  .btn-load-photo {
    width 50%
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    color #FFF
    text-transform none
  }

  .selected-img-wrp{
    border-radius: 5px
    box-shadow 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
               0px 4px 5px 0px rgba(0, 0, 0, 0.14),
               0px 1px 10px 0px rgba(0, 0, 0, 0.12)
  }

  .img-wrp{
    width 100%
    max-height 300px
    border-bottom none
    line-height 0
    border-radius: 5px
  }

  .img{
    max-height 300px
  }

  .v-image{
    border-bottom-left-radius 0px
    border-bottom-right-radius 0px
  }

  .v-btn{
    box-shadow none
  }

  .send-btn{
    width 100%
    border-top-left-radius 0px
    border-top-right-radius 0px
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    color #FFF
  }

  .more-action-img{
    background-color: rgba(33, 33, 33, 0.46)
    height 100%
    width 100%
    margin 0 !important
    color #FFF
  }

</style>
