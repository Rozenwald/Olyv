const getters = {
  getItemsSetting: (state) => state.items,
};

const state = {
  items: [
    { title: 'Уведомления', icon: 'Notification' },
    { title: 'Черный список', icon: 'BlackList' },
    { title: 'Редактирвание профиля', icon: 'EditProfile' },
    { title: 'Связь с разработчиком', icon: 'ConnectDev' },
    { title: 'Информация', icon: 'Info' },
  ],
};

export default {
  state,
  getters,
};
