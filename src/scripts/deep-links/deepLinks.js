/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */

import store from '../../store/index';
import logger from '../logger';
import router from '../../router';

class DeepLinks {
  subscribeUpdatePassword() {
    universalLinks.subscribe('updatePassword', (eventData) => {
      store.dispatch('setRecoveryPasswordToken', eventData.params.token);
      router.replace({ name: 'updatePassword' });
    });
  }

  subscribeConfirmEmail() {
    universalLinks.subscribe('confirmEmail', (eventData) => {
      store.dispatch('setConfirmEmailToken', eventData.params.token);
      router.replace({ name: 'confirmCabinet' });
    });
  }

  subscribeAnyPath() {
    universalLinks.subscribe('anyPath', (eventData) => {
      logger.log(`Open with url: ${eventData.url}`);
    });
  }

  unsubscribeUpdatePassword() {
    universalLinks.unsubscribe('updatePassword');
  }

  unsubscribeConfirmEmail() {
    universalLinks.unsubscribe('confirmEmail');
  }

  unsubscribeAnyPath() {
    universalLinks.unsubscribe('anyPath');
  }

  subscribeAll() {
    this.subscribeUpdatePassword();
    this.subscribeConfirmEmail();
    this.subscribeAnyPath();
  }

  unsubscribeAll() {
    this.unsubscribeUpdatePassword();
    this.unsubscribeConfirmEmail();
    this.unsubscribeAnyPath();
  }
}

export default DeepLinks;
