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
  showChatDialog(state, data) {
    state.chatShow = data.show;
    state.element = data.element;
  },
  textForChatDialog(state, flag) {
    state.text = flag;
  },
  setErrorShow(state, data) {
    const arr = state.messages[state.idUserRequest];
    console.log(arr);
    console.log(arr[data.element]);
    console.log(arr[data.element].errorShow);
    console.log(data.show);
    arr[data.element].show = data.show;
    console.log(arr[data.element].errorShow);
    console.log(arr[data.element]);
  },
  deleteMessage(state, data) {
    const arr = state.messages[state.idUserRequest];
    arr.splice([data.element], 1);
  },
};

const actions = {
  showChatDialog({ commit }, data) {
    commit('showChatDialog', data);
  },
  textForChatDialog({ commit }, text) {
    commit('textForChatDialog', text);
  },
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
  isVisibleChatDialog: (state) => state.chatShow,
  textForErrorDialog: (state) => state.text,
  getIdUserRequest: (state) => state.idUserRequest,
  getUserRequest: (state) => state.userRequest,
  getMessages: (state) => state.messages,
  getErrorShow: (state) => state.errorShow,
  getElement: (state) => state.element,
};

const state = {
  idUserRequest: null,
  userRequest: null,
  messages: {},
  errorShow: false,
  chatShow: false,
  element: null,
  text: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
