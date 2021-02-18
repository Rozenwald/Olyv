/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */

import store from '../../store/index';
import logger from '../logger';
import router from '../../router';

class DeepLinks {
  subscribeRecoveryPassword() {
    universalLinks.subscribe('recoveryPassword', (eventData) => {
      store.dispatch('setRecoveryPasswordToken', eventData.params.token);
      router.replace({ name: 'updatePassword' });
    });
  }

  subscribeAnyPath() {
    universalLinks.subscribe('anyPath', (eventData) => {
      logger.log(`Open with url: ${eventData.url}`);
    });
  }

  unsubscribeRecoveryPassword() {
    universalLinks.unsubscribe('recoveryPassword');
  }

  unsubscribeAnyPath() {
    universalLinks.unsubscribe('anyPath');
  }

  subscribeAll() {
    this.subscribeRecoveryPassword();
    this.subscribeAnyPath();
  }

  unsubscribeAll() {
    this.unsubscribeRecoveryPassword();
    this.unsubscribeAnyPath();
  }
}

export default DeepLinks;
