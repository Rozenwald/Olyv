const mutations = {
  setIdUserRequest(state, id) {
    state.idUserRequest = id;
  },
  setUserRequest(state, data) {
    state.userRequest = data;
  },
  setAllMessages(state, data) {
    state.messages[data.id] = data.messages;
  },
  setMessage(state, data) {
    state.messages[data.id].push(data.message);
    window.localStorage.setItem(state.idUserRequest, data.message.step);
  },
};

const actions = {
  setIdUserRequest({ commit }, id) {
    commit('setIdUserRequest', id);
  },
  setUserRequest({ commit }, data) {
    commit('setUserRequest', data);
  },
  setAllMessages({ commit }, data) {
    commit('setAllMessages', data);
  },
  setMessage({ commit }, data) {
    commit('setMessage', data);
  },
};

const getters = {
  getIdUserRequest: (state) => state.idUserRequest,
  getUserRequest: (state) => state.userRequest,
  getMessages: (state) => state.messages,
};

const state = {
  idUserRequest: null,
  userRequest: null,
  messages: {},
};

export default {
  state,
  mutations,
  getters,
  actions,
};
