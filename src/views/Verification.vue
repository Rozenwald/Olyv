<template lang="pug">
  v-container
    v-row.verification(align='center' justify='center' ref="wrp")
      .center-wrp
        .verification-description(
          v-text="description"
          v-show="user.verification == 'notCompleted' && !src && !comment"
        )
        .comment-description(
          v-text="comment"
          v-show="comment"
        )
        .await-description(v-text="descriptionAwait" v-show="user.verification == 'await'")
        v-col.circle-photo-wrp(align='center' v-show="!src && user.verification == 'notCompleted'")
          v-row.circle-photo(align='center'
                             justify='center'
                             class="animate__animated animate__pulse animate__infinite"
                             @click="choosePhoto"
                            )
            svg-icon(name="PhotoCamera" width="37" height="37")
        .selected-img-wrp(v-show="src")
          .img-wrp(@click="setMoreActionImg")
            v-img.img(:src="src" :width="wrpWidth")
              v-row.more-action-img(align='center' justify='center' v-show="moreActionImg")
                span(@click="choosePhoto") Загрузить заново
          v-btn.send-btn(@click="sendData") Отправить
      input(type="file" @change="handleFileUpload" ref="input")
</template>

<script>
import axios from 'axios';
import animate from 'animate.css';
import store from '../store';
import SvgIcon from '../components/SvgIcon.vue';
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';

export default {
  name: 'Verification',
  components: {
    SvgIcon,
    animate,
    axios,
    store,
  },
  data: () => ({
    photoIsLoad: false,
    descriptionAwait: 'Ожидание верификации',
    description: 'Для получения статуса исполнителя необходимо пройти верификацию. Пожалуйста, загрузите фотографию паспорта',
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
    choosePhoto(event) {
      event.preventDefault();
      this.$refs.input.click();
    },

    handleFileUpload(event) {
      event.preventDefault();
      this.selectImage(event.target.files[0]);
    },

    selectImage(file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = this.onImageLoad;
      reader.readAsDataURL(file);
    },

    onImageLoad(e) {
      this.content = e.target.result;
      const filename = this.file instanceof File ? this.file.name : '';
      this.$emit('input', filename);
      this.$emit('image-changed', this.content);
      this.wrpWidth = this.$refs.wrp.offsetWidth;
      this.moreActionImg = false;
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
          dialog.open('Ошибка', '', true, true);
          logger.log(error);
        });
    },

    checkResponse(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.getUserData();
          if (this.comment) {
            this.$store.dispatch('setComment', null);
          }
          break;
        case 'invalidPhoto':
          this.errorBody = 'Неверный формат фото';
          dialog.open('Ошибка', this.errorBody, true, false);
          break;
        case 'already':
          this.errorBody = 'Вы уже отправили запрос';
          dialog.open('Ошибка', this.errorBody, true, false);
          break;
        case 'notAuthenticate':
          dialog.open('Ошибка', 'Пользователь неавторизирован, советуем пройти авторизацию, чтобы получить доступ к полному функционалу приложения', true, true, this.$router.push('auth'));
          break;
        default:
          dialog.open('Ошибка', this.errorBody, true, false);
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
          dialog.open('Ошибка', '', true);
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
          this.errorBody = 'Ошибка';
          break;
      }
    },
  },
  computed: {
    src() {
      return this.content;
    },

    token() {
      return this.$store.getters.getToken;
    },

    user() {
      return this.$store.getters.getUser;
    },

    comment() {
      return this.$store.getters.getComment;
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

  .circle-photo-wrp{
    margin-top 46px
  }

  .circle-photo{
    width 74px
    height 74px
    background-color #56D68B
    border-radius 12vw
  }

  input[type="file"]{
    position absolute
    left -500px
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
    margin-top 46px
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
    font-size 13px
  }

  .more-action-img{
    background-color: rgba(33, 33, 33, 0.46)
    height 100%
    width 100%
    margin 0 !important
    color #FFF
  }

</style>
