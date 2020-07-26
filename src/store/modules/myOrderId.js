const mutations = {
  setMyOrderId(state, id) {
    state.id = id;
  },
};

const actions = {
  setMyOrderId({ commit }, id) {
    commit('setMyOrderId', id);
  },
};

const getters = {
  getMyOrderId: (state) => state.id,
};

const state = {
  id: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
