<template lang="pug">
  v-container
    v-row.verification(align='center' justify='center' ref="wrp")
      v-sheet.center-wrp(elevation="1" v-if="!content")

        .verification-description(
          v-text="description"
          v-show="user.verification == 'notCompleted' && !content && !comment")

        .comment-wrp(v-show="comment")
          .comment-description(v-text="commentDescription")
          .comment(v-text="comment")

        .await-description(
          v-text="descriptionAwait"
          v-show="user.verification == 'await' && !comment")

        v-row.btn-load-photo-wrp(
          align="center"
          justify="center"
          v-show="user.verification == 'notCompleted' || comment")

          v-btn.btn-load-photo(
            rounded
            @click="actionPhoto"
            v-text="comment ? 'Выбрать другое фото' : 'Добавить фото'")

        v-row.btn-open-text(align='center' justify='center' v-if="!content")
          v-expansion-panels
            v-expansion-panel(v-for="(item,i) in 1" :key="i")
              v-expansion-panel-header(
                v-show="!isFocus") Почему это безопасно?
              v-expansion-panel-content.panel-description(v-text="descriptionPanel")

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
import dialogMessages from '../scripts/dialogMessages';
// eslint-disable-next-line import/no-cycle
import router from '../router';

export default {
  name: 'Verification',
  components: {
    SvgIcon,
  },
  data: () => ({
    photoIsLoad: false,
    descriptionAwait: 'Ожидание верификации',
    commentDescription: 'Вам было отказано в верификации со следующим комментарием:',
    description: 'Подтвердите, пожалуйста, свою личность для получения статуса "Исполнитель". Необходимы фотографии двух страниц паспорта: основная и разворот с регистрацией.',
    descriptionPanel: 'Верификация абсолютно безопасна, и  необходима для предотвращения возможных мошеннических действий, направленных против Вас или других пользователей Приложения. Данная мера необходима для восстановления Вами входа в аккаунт(в случае утери e-mail), для помощи Вам в решении спорных рабочих ситуаций, а также повышает уровень доверия к Вам Заказчиков. Ваша персональная информация  размещается и обрабатывается строго конфиденциально: Ваши данные защищены множеством протоколов шифрования с применением современных технологий безопасности. Все взаимодействия с Вашими персональными данными, строго регламентируются и охраняются Законами Российской Федерации (Федеральный Закон #152) и нормами международного права.',
    content: '',
    wrpWidth: null,
    moreActionImg: false,
    file: null,
    errorBody: '',
  }),
  methods: {
    setMoreActionImg(event) {
      if (event.target.tagName !== 'SPAN') {
        this.moreActionImg = !this.moreActionImg;
      }
    },

    ...mapActions('actionPhotoDialogVerification', [
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
          this.wrpWidth = this.$refs.wrp.offsetWidth;
          this.content = `data:image/jpeg;base64,${imageUrl}`;
          const blob = file.dataURLtoBlob(`data:image/jpeg;base64,${imageUrl}`);
          logger.log(blob);
          this.file = blob;
        })
        .catch((error) => {
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

      if (srcType === 'camera-photo') {
        // eslint-disable-next-line no-undef
        options.sourceType = Camera.PictureSourceType.CAMERA;
      }

      return options;
    },

    sendData() {
      if (this.file) {
        const data = new FormData();
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
            dialogWindow.open(
              dialogMessages.getTitle('error'),
              dialogMessages.getBody('errorPhoto'),
              true,
              false,
            );
            logger.log(error);
          });
      }
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
          dialogWindow.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('invalidPhoto'),
            true,
            false,
          );
          break;
        case 'already':
          dialogWindow.open(
            dialogMessages.getTitle('warning'),
            dialogMessages.getBody('awaitAdminResponse'),
            true,
            false,
          );
          break;
        case 'notAuthenticate':
          dialogWindow.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          dialogWindow.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorPhoto'),
            true,
            false,
          );
          logger.log(response);
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
          dialogWindow.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorPhoto'),
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
          this.content = '';
          this.$router.back();
          break;
        case 'notAuthenticate':
          dialogWindow.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          dialogWindow.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorPhoto'),
            true,
            false,
          );
          logger.log(response);
          break;
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },

    sourceType: {
      get() { return this.$store.state.actionPhotoDialogVerification.sourceType; },
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

      if (this.sourceType === 'camera-photo') {
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
      dialogWindow.open(
        dialogMessages.getTitle('needToAuth'),
        dialogMessages.getBody('needToAuth'),
        true,
        false,
        router.push('auth'),
      );
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

  .comment {
    font-weight 400
    margin-top: 12px;
  }
  .panel-description {
    margin 10px
    font-size 14px
    margin-top 5px
    word-break: normal
  }
  .btn-open-text{
    margin 5px
    margin-top 25px
  }
</style>
