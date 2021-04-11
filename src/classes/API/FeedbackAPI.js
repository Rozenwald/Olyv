import axios from 'axios';
import logger from '../../scripts/logger';

class FeedbackAPI {
  constructor(baseAPI) {
    this.token = baseAPI.token;
    this.url = `${window.$baseUrl}api/v1/private/feedback`;
  }

  async add(feedback) {
    const body = {
      method: 'add',
      idFeedback: feedback.id,
      rating: feedback.rating,
      token: this.token,
    };

    try {
      return await axios.post(this.url, body);
    } catch (error) {
      logger.log(error);
    }

    return null;
  }

  async receiveByUserId(idUser) {
    const body = {
      method: 'receive',
      submethod: 'byIdUser',
      token: this.token,
      idUser,
    };

    try {
      return await axios.post(this.url, body);
    } catch (error) {
      logger.log(error);
    }

    return null;
  }

  async receiveMyAwait() {
    const body = {
      method: 'receive',
      submethod: 'empty',
      token: this.token,
    };

    try {
      return await axios.post(this.url, body);
    } catch (error) {
      logger.log(error);
    }

    return null;
  }

  async receiveMyCompleted() {
    const body = {
      method: 'receive',
      submethod: 'full',
      token: this.token,
    };

    try {
      return await axios.post(this.url, body);
    } catch (error) {
      logger.log(error);
    }

    return null;
  }

  async receiveInner() {
    const body = {
      method: 'receive',
      submethod: 'inner',
      token: this.token,
    };

    try {
      return await axios.post(this.url, body);
    } catch (error) {
      logger.log(error);
    }

    return null;
  }
}

export default FeedbackAPI;
