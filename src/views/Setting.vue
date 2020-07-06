<template lang="pug">
  .setting-wrp
    .setting
      v-list
        v-list-item(v-for="item in items" :key="item.title")
          v-list-item-icon
            v-icon(v-text='item.icon')
          v-list-item-content
            v-list-item-title(v-text='item.title')
          v-list-item-action
            v-btn(icon)
              v-icon.right_arrow(v-text='right_arrow')
</template>

<script>

export default {
  name: 'Setting',
  data: () => ({
    items: [
      { title: 'Уведомления', icon: '$vuetify.icons.notification' },
      { title: 'Черный список', icon: '$vuetify.icons.black_list' },
      { title: 'Редактирвание профиля', icon: '$vuetify.icons.edit_profile' },
      { title: 'Связь с разработчиком', icon: '$vuetify.icons.connect_dev' },
      { title: 'Информация', icon: '$vuetify.icons.info' },
    ],
    right_arrow: '$vuetify.icons.right_arrow',
  }),
};
</script>

<style lang="stylus" scoped>
  .setting{
    padding 0 15px
    background-color white
  }

  .right_arrow{
    width 8px !important
    height auto !important
  }

  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }

  .v-list-item:last-child {
    border-bottom none
  }

</style>
