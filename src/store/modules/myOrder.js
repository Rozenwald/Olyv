const mutations = {
  setMyOrder(state, order) {
    state.order = order;
    state.respondedList = [];
  },
  setType(state, type) {
    state.type = type;
  },
  setRespondedList(state, respondedList) {
    state.respondedList = [...state.respondedList, ...respondedList];
    console.log('respondedList', state.respondedList);
  },
};

const actions = {
  setMyOrder({ commit }, order) {
    commit('setMyOrder', order);
  },
  setType({ commit }, type) {
    commit('setType', type);
  },
  setRespondedList({ commit }, respondedList) {
    commit('setRespondedList', respondedList);
  },
};

const getters = {
  getMyOrder: (state) => state.order,
  getOrderType: (state) => state.type,
  getRespondedList: (state) => state.respondedList,
};

const state = {
  order: null,
  type: null,
  respondedList: [],
};

export default {
  state,
  getters,
  mutations,
  actions,
};
