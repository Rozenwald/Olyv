const mutations = {
  setToken(state, token) {
    state.token = token;
    if (token !== null) {
      state.isAuth = true;
    } else {
      state.isAuth = false;
    }
  },
  setUser(state, user) {
    state.user = user;
    state.hasData = true;
    console.log(user);
  },
  setChatToken(state, chattoken) {
    state.chattoken = chattoken;
  },
  setIdChanal(state, idChanal) {
    state.idChanal = idChanal;
  },
  setAppToken(state, appToken) {
    state.appToken = appToken;
  },
  setNotificationToken(state, notificationToken) {
    state.notificationToken = notificationToken;
  },
  setNotificationIdChanal(state, notificationIdChanal) {
    state.notificationIdChanal = notificationIdChanal;
  },
  clear(state) {
    state.chattoken = null;
    state.notificationIdChanal = null;
    state.appToken = null;
    state.notificationToken = null;
    state.idChanal = null;
    state.token = null;
    state.isAuth = null;
    state.user = {};
    state.hasData = false;
  },
};

const actions = {
  setChatToken({ commit }, chattoken) {
    commit('setChatToken', chattoken);
  },
  setIdChanal({ commit }, idChanal) {
    commit('setIdChanal', idChanal);
  },
  setAppToken({ commit }, appToken) {
    commit('setAppToken', appToken);
  },
  setNotificationToken({ commit }, notificationToken) {
    commit('setNotificationToken', notificationToken);
  },
  setNotificationIdChanal({ commit }, notificationIdChanal) {
    commit('setNotificationIdChanal', notificationIdChanal);
  },
  setToken({ commit }, token) {
    commit('setToken', token);
  },
  setUser({ commit }, user) {
    commit('setUser', user);
  },
  clear({ commit }) {
    commit('clear');
  },
};

const getters = {
  getChatToken: (state) => state.chattoken,
  getNotificationToken: (state) => state.notificationToken,
  getIdChanal: (state) => state.idChanal,
  getToken: (state) => state.token,
  getAppToken: (state) => state.appToken,
  isAuth: (state) => state.isAuth,
  getUser: (state) => state.user,
  hasData: (state) => state.hasData,
};

const state = {
  chattoken: null,
  notificationIdChanal: null,
  appToken: null,
  notificationToken: null,
  idChanal: null,
  token: null,
  isAuth: null,
  user: {},
  hasData: false,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
