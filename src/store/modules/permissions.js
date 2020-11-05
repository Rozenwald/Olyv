const mutations = {
  setLocationPermissionCount(state, count) {
    state.locationPermissionCount = count;
  },
};

const actions = {
  setLocationPermissionCount({ commit }, count) {
    commit('setLocationPermissionCount', count);
  },
};

const getters = {
  getLocationPermissionCount: (state) => state.locationPermissionCount,
};

const state = {
  locationPermissionCount: 0,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
