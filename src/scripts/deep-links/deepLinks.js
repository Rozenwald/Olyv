/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */

import store from '../../store/index';
import logger from '../logger';

class DeepLinks {
  subscribeRecoveryPassword() {
    universalLinks.subscribe('recoveryPassword', (eventData) => {
      logger.log('AAAAAAAAAAAAAAAAA');
      logger.log(eventData.url);
      store.dispatch('setRecoveryPasswordToken', eventData.params.token);
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
