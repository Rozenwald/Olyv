const mutations = {
  setAwaitCustomerFeedbacks(state, data) {
    state.awaitCustomerFeedbacks = data;
    console.log(state.awaitCustomerFeedbacks);
  },
  setAwaitExecutorFeedbacks(state, data) {
    state.awaitExecutorFeedbacks = data;
    console.log(state.awaitExecutorFeedbacks);
  },
  setInnerFeedbacks(state, data) {
    state.innerFeedbacks = data;
  },
  setIdUserFeedbacks(state, data) {
    state.idUserFeedbacks = data;
  },
  setFullFeedbacks(state, data) {
    state.fullFeedbacks = data;
  },

  setMyFeedbackOrder(state, data) {
    state.myFeedbackOrder = data;
  },
};

const actions = {
  setAwaitCustomerFeedbacks({ commit }, data) {
    commit('setAwaitCustomerFeedbacks', data);
  },
  setAwaitExecutorFeedbacks({ commit }, data) {
    commit('setAwaitExecutorFeedbacks', data);
  },
  setInnerFeedbacks({ commit }, data) {
    commit('setInnerFeedbacks', data);
  },
  setIdUserFeedbacks({ commit }, data) {
    commit('setIdUserFeedbacks', data);
  },
  setFullFeedbacks({ commit }, data) {
    commit('setFullFeedbacks', data);
  },

  setMyFeedbackOrder({ commit }, data) {
    commit('setMyFeedbackOrder', data);
  },
};

const getters = {
  getAwaitCustomerFeedbacks: (state) => state.awaitCustomerFeedbacks,
  getAwaitExecutorFeedbacks: (state) => state.awaitExecutorFeedbacks,
  getInnerFeedbacks: (state) => state.innerFeedbacks,
  getIdUserFeedbacks: (state) => state.idUserFeedbacks,
  getFullFeedbacks: (state) => state.fullFeedbacks,

  getMyFeedbackOrder: (state) => state.myFeedbackOrder,
};

const state = {
  awaitCustomerFeedbacks: null,
  awaitExecutorFeedbacks: null,
  innerFeedbacks: null,
  idUserFeedbacks: null,
  fullFeedbacks: null,
  myFeedbackOrder: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
