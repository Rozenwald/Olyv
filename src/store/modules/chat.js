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
  setErrorShow(state, data) {
    const arr = state.messages[state.idUserRequest];
    arr[state.messages[state.idUserRequest].length - 1].show = data;
    console.log(arr[state.messages[state.idUserRequest].length - 1]);
  },
  deleteMessage(state) {
    const arr = state.messages[state.idUserRequest];
    state.messages[state.idUserRequest].splice([arr.length - 1], 1);
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
  setErrorShow({ commit }, data) {
    commit('setErrorShow', data);
  },
  deleteMessage({ commit }, data) {
    commit('deleteMessage', data);
  },
};

const getters = {
  getIdUserRequest: (state) => state.idUserRequest,
  getUserRequest: (state) => state.userRequest,
  getMessages: (state) => state.messages,
  getLastMessage: (state) => state.messages[state.messages.length - 1],
  getErrorShow: (state) => state.show,
};

const state = {
  idUserRequest: null,
  userRequest: null,
  messages: {},
  show: false,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
