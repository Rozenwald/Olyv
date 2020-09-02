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
    console.log(user);
    state.user = user;
    state.hasData = true;
  },
  setChatToken(state, chattoken) {
    console.log(chattoken);
    state.chattoken = chattoken;
  },
  setIdChanal(state, idChanal) {
    console.log(idChanal);
    state.idChanal = idChanal;
  },
};

const actions = {
  setChatToken({ commit }, chattoken) {
    commit('setChatToken', chattoken);
  },
  setIdChanal({ commit }, idChanal) {
    commit('setIdChanal', idChanal);
  },
  setToken({ commit }, token) {
    commit('setToken', token);
  },
  setUser({ commit }, user) {
    commit('setUser', user);
  },
};

const getters = {
  getChatToken: (state) => state.chattoken,
  getIdChanal: (state) => state.idChanal,
  getToken: (state) => state.token,
  isAuth: (state) => state.isAuth,
  getUser: (state) => state.user,
  hasData: (state) => state.hasData,
};

const state = {
  chattoken: null,
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
