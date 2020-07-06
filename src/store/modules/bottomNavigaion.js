const getters = {
  getItems: (state) => state.items,
};

const state = {
  items: [
    { title: 'Мои заказы', icon: '$vuetify.icons.my_orders', routeName: '' },
    { title: 'Список заказов', icon: '$vuetify.icons.orders_list', routeName: '' },
    { title: '', icon: '$vuetify.icons.plus' },
    { title: 'Профиль', icon: '$vuetify.icons.user', routeName: 'profile' },
    { title: 'Настройки', icon: '$vuetify.icons.setting', routeName: 'setting' },
  ],
};

export default {
  state,
  getters,
};
