<template lang="pug">
  .public-profile
    ProfileHeader(:user='user')
    ProfileDescription(:userCard='userCard')
    ProfileGallery(:userCard='userCard' )
    review(type="publicProfile" :idUser='idUser')
</template>

<script>
/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import logger from '../scripts/logger';
import dialog from '../scripts/openDialog';
import dialogMessages from '../scripts/dialogMessages';

import Review from '../components/customerProfile/Review.vue';
import ProfileHeader from '../components/publicProfile/Header.vue';
import ProfileDescription from '../components/publicProfile/Description.vue';
import ProfileGallery from '../components/publicProfile/Gallery.vue';

export default {
  name: 'public-header',
  components: {
    Review,
    ProfileHeader,
    ProfileDescription,
    ProfileGallery,
  },
  beforeRouteUpdate(to, from, next) {
    const { idUser } = to.params;
    next();
    this.init(idUser);
  },
  props: {
    idUser: String,
  },
  data() {
    return {
      user: {},
      userCard: {},
    };
  },
  methods: {
    async init(idUser) {
      this.$store.commit('setTitle', 'Профиль');
      console.log(idUser);
      let response = await this.getUserData(idUser);
      this.user = this.checkResponse(response) || {};
      console.log(this.user);

      const { idUserCard } = this.user;
      response = await this.getUserCardData(idUserCard);
      this.userCard = this.checkResponse(response) || { _id: '123' }; //! заглушка
      console.log(this.userCard);
    },

    async getUserData(id) {
      const body = {
        method: 'receive',
        submethod: 'id',
        token: this.token,
        id,
      };

      try {
        return await axios.post(`${this.$baseUrl}api/v1/private/user`, body);
      } catch (error) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('failLoadUser'),
          true,
          false,
        );

        logger.log(error);
      }

      return null;
    },

    async getUserCardData(idUserCard) {
      const body = {
        method: 'receive',
        submethod: 'byId',
        token: this.token,
        idUserCard,
      };

      try {
        return await axios.post(`${this.$baseUrl}api/v1/private/userCard`, body);
      } catch (error) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('failLoadUser'),
          true,
          false,
        );

        logger.log(error);
      }

      return null;
    },

    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          return response.data.data;
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
          return null;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          break;
      }

      return null;
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  created() {
    this.init(this.idUser);
  },
};
</script>
