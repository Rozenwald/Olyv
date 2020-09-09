const mutations = {
  setIdUserRequest(state, id) {
    state.idUserRequest = id;
  },
  setUserRequest(state, data) {
    state.userRequest = data;
  },
  setAllMessages(state, messages) {
    if (state.messages[state.idUserRequest]) {
      state.messages[state.idUserRequest] = messages.concat(state.messages[state.idUserRequest]);
    } else {
      state.messages[state.idUserRequest] = messages;
    }
  },
  setMessage(state, message) {
    state.messages[state.idUserRequest].push(message);
    window.localStorage.setItem(state.idUserRequest, message.step);
  },
};

const actions = {
  setIdUserRequest({ commit }, id) {
    commit('setIdUserRequest', id);
  },
  setUserRequest({ commit }, data) {
    commit('setUserRequest', data);
  },
  setAllMessages({ commit }, messages) {
    commit('setAllMessages', messages);
  },
  setMessage({ commit }, message) {
    commit('setMessage', message);
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
