const getters = {
  getItemsSetting: (state) => state.items,
};

const state = {
  items: [
    { title: 'Уведомления', icon: 'Notification' },
    { title: 'Черный список', icon: 'BlackList' },
    { title: 'Редактирвание профиля', icon: 'EditProfile', route: 'setUserData' },
    { title: 'Связь с разработчиком', icon: 'ConnectDev' },
    { title: 'Информация', icon: 'Info' },
    { title: 'Ключевые слова', icon: 'BlackList', route: 'keyWords' },
  ],
};

export default {
  state,
  getters,
};
