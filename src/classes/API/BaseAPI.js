import store from '../../store/index';

class BaseAPI {
  constructor(root) {
    this.root = root;
    this.token = store.getters.getToken;
  }
}

export default BaseAPI;
