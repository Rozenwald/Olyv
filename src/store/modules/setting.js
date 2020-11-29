const getters = {
  getItemsSetting: (state) => state.items,
};

const state = {
  items: [
    { title: 'Редактирование профиля', icon: 'EditProfile', route: 'setUserData' },
    { title: 'Ключевые слова', icon: 'BlackList', route: 'keyWords' },
  ],
};

export default {
  state,
  getters,
};
