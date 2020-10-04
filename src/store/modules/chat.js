const mutations = {
  setIdUserRequest(state, id) {
    state.idUserRequest = id;
  },
  setUserRequest(state, data) {
    state.userRequest = data;
  },
  setAllMessages(state, data) {
    console.log(data);
    state.messages[data.id] = data.messages.reverse();
    console.log(state.messages[data.id].length);
  },
  setMoreMessages(state, data) {
    state.messages[data.id] = [...data.messages.reverse(), ...state.messages[data.id]];
    console.log(state.messages[data.id].length);
  },
  setMessage(state, data) {
    state.messages[data.id].push(data.message);
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
  setMoreMessages({ commit }, data) {
    commit('setMoreMessages', data);
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
