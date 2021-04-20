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
    state.currentAuthToken = user.currentAuthToken;
    console.log(state.user);
  },
  setUserCard(state, userCard) {
    state.userCard = userCard;
    console.log(state.userCard);
  },
  setCurrentAuthToken(state, chattoken) {
    state.chattoken = chattoken;
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
    state.notificationToken = null;
    state.idChanal = null;
    state.token = null;
    state.isAuth = false;
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
  setCurrentAuthToken({ commit }, token) {
    commit('setCurrentAuthToken', token);
  },
  setUser({ commit }, user) {
    commit('setUser', user);
  },
  setUserCard({ commit }, userCard) {
    commit('setUserCard', userCard);
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
  getCurrentAuthToken: (state) => state.currentAuthToken,
  getAppToken: (state) => state.appToken,
  isAuth: (state) => state.isAuth,
  getUser: (state) => state.user,
  hasData: (state) => state.hasData,
  getUserCard: (state) => state.userCard,
};

const state = {
  chattoken: null,
  notificationIdChanal: null,
  appToken: null,
  notificationToken: null,
  idChanal: null,
  token: null,
  currentAuthToken: null,
  isAuth: null,
  user: {},
  hasData: false,
  userCard: {},
};

export default {
  state,
  getters,
  mutations,
  actions,
};
