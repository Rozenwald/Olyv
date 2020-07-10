const mutations = {
  setTitle(state, title) {
    state.current_title = title;
  },
};

const getters = {
  getTitle: (state) => state.current_title,
};

const state = {
  current_title: null,
};

export default {
  state,
  mutations,
  getters,
};
