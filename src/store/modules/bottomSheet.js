const mutations = {
  setBottomSheetStatus(state, status) {
    switch (state.activeType) {
      case 'main':
        state.statusMain = status;
        break;
      case 'address':
        state.statusAddress = status;
        break;
      case 'description':
        state.statusDescription = status;
        break;
      case 'cost':
        state.statusCost = status;
        break;
      default:
        break;
    }
  },
  setActiveType(state, type) {
    state.activeType = type;
  },
};

const actions = {
  setBottomSheetStatus({ commit, state }, status) {
    commit('setBottomSheetStatus', status);
    if (state.activeType === 'main') {
      if (status === 'close') {
        commit('showBottomNavigation', true);
      } else {
        commit('showBottomNavigation', false);
      }
    }
  },
  setActiveType({ commit }, type) {
    commit('setActiveType', type);
  },
};

const getters = {
  getBottomSheetStatus: (state) => {
    switch (state.activeType) {
      case 'main':
        return state.statusMain;
      case 'address':
        return state.statusAddress;
      case 'description':
        return state.statusDescription;
      case 'cost':
        return state.statusCost;
      default:
        return null;
    }
  },
};

const state = {
  statusMain: 'close',
  statusAddress: 'close',
  statusCost: 'close',
  statusDescription: 'close',
  activeType: 'main',
};

export default {
  state,
  getters,
  mutations,
  actions,

};
