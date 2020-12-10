<template lang="pug">
  v-sheet.user-field(elevation="1" rounded)
    v-list-item
      v-list-item-avatar(size="62")
        avatar(type="public" size="62" :src="photo")
      v-list-item-content.content
        v-list-item-title {{name}}
        <!--v-list-item-subtitle
           v-rating(
            :length="5"
            readonly
            :half-increments="true"
            dense
            color="#FFCA10"
            background-color="#FFCA10"
            size="14") -->
</template>

<script>
import Avatar from '../Avatar.vue';

export default {
  name: 'user-card',
  components: {
    Avatar,
  },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    photo() {
      if (!this.user) {
        return ' ';
      }

      if (!this.user.photo) {
        return ' ';
      }

      if (!this.user.photo.length) {
        return null;
      }

      const url = this.user.photo[this.user.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
    },

    name() {
      if (this.user.name && this.user.lastname) {
        return `${this.user.name} ${this.user.lastname}`;
      }

      if (this.user.name) {
        return this.user.name;
      }

      if (this.user.email) {
        return this.user.email;
      }

      return '';
    },
  },
};
</script>

<style lang="stylus" scoped>
  .content {
    text-align center
  }
</style>
