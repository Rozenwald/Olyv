const mutations = {
  setAddressSheetStatus(state, status) {
    state.statusAddress = status;
  },
  setMainSheetStatus(state, status) {
    state.statusMain = status;
  },
  setDescriptionSheetStatus(state, status) {
    state.statusDescription = status;
  },
  setCostSheetStatus(state, status) {
    state.statusCost = status;
  },
  setMyCostSheetStatus(state, status) {
    state.statusMyCost = status;
  },
  setAddressData(state, addressData) {
    state.addressData = addressData;
  },
  setDescription(state, description) {
    state.description = description;
  },
  setCost(state, cost) {
    state.cost = cost;
  },
  setMediaFiles(state, mediaFiles) {
    state.mediaFiles = mediaFiles;
  },
  setPhotoFiles(state, photoFiles) {
    state.photoFiles = photoFiles;
  },
  addMediaFile(state, mediaFile) {
    state.mediaFiles.push(mediaFile);
  },
  addPhotoFile(state, photoFile) {
    state.photoFiles.push(photoFile);
  },
  removeMediaFile(state, index) {
    state.mediaFiles.splice(index, 1);
  },
  removePhotoFile(state, index) {
    state.photoFiles.splice(index, 1);
  },
  setAll(state, data) {
    state.cost = data.cost;
    state.addressData.value = data.address;
    state.description = data.description;
    // eslint-disable-next-line no-underscore-dangle
    state.orderId = data._id;
  },
  isEdit(state, isEdit) {
    state.isEdit = isEdit;
  },
};

const actions = {
  setMainSheetStatus({ commit }, status) {
    commit('setMainSheetStatus', status);
  },
  setAddressSheetStatus({ commit }, status) {
    commit('setAddressSheetStatus', status);
  },
  setDescriptionSheetStatus({ commit }, status) {
    commit('setDescriptionSheetStatus', status);
  },
  setCostSheetStatus({ commit }, status) {
    commit('setCostSheetStatus', status);
  },
  setAddressData({ commit }, addressData) {
    commit('setAddressData', addressData);
  },
  setDescription({ commit }, description) {
    commit('setDescription', description);
  },
  setCost({ commit }, cost) {
    commit('setCost', cost);
  },
  setMediaFiles({ commit }, mediaFiles) {
    commit('setMediaFiles', mediaFiles);
  },
  setPhotoFiles({ commit }, photoFiles) {
    commit('setPhotoFiles', photoFiles);
  },
  addMediaFile({ commit }, mediaFiles) {
    commit('addMediaFile', mediaFiles);
  },
  addPhotoFile({ commit }, photoFile) {
    commit('addPhotoFile', photoFile);
  },
  removeMediaFile({ commit }, index) {
    commit('removeMediaFile', index);
  },
  removePhotoFile({ commit }, index) {
    commit('removePhotoFile', index);
  },
  setMyCostSheetStatus({ commit }, cost) {
    commit('setMyCostSheetStatus', cost);
  },
  setAll({ commit }, data) {
    commit('setAll', data);
  },
  isEdit({ commit }, isEdit) {
    commit('isEdit', isEdit);
  },
};

const getters = {
  getMainSheetStatus: (state) => state.statusMain,
  getAddressSheetStatus: (state) => state.statusAddress,
  getDescriptionSheetStatus: (state) => state.statusDescription,
  getCostSheetStatus: (state) => state.statusCost,
  getMyCostSheetStatus: (state) => state.statusMyCost,
  getAddressData: (state) => state.addressData,
  getDescription: (state) => state.description,
  getCost: (state) => state.cost,
  getOrderId: (state) => state.orderId,
  getMediaFiles: (state) => state.mediaFiles,
  getPhotoFiles: (state) => state.photoFiles,
  isEdit: (state) => state.isEdit,
};

const state = {
  statusMain: false,
  statusAddress: false,
  statusCost: false,
  statusMyCost: false,
  statusDescription: false,
  addressData: {},
  description: null,
  cost: null,
  isEdit: false,
  mediaFiles: [],
  photoFiles: [],
  orderId: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
