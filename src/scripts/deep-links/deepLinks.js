/* eslint-disable no-undef */

import store from '../../store/index';

class DeepLinks {
  // eslint-disable-next-line class-methods-use-this
  subscribeRecoveryPassword() {
    universalLinks.subscribe('recoveryPassword', (eventData) => {
      store.dispatch('setRecoveryPasswordToken', eventData.params.token);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  unsubscribeRecoveryPassword() {
    universalLinks.unsubscribe('recoveryPassword');
  }

  subscribeAll() {
    this.subscribeRecoveryPassword();
  }

  unsubscribeAll() {
    this.unsubscribeRecoveryPassword();
  }
}

export default DeepLinks;
