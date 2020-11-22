/* eslint-disable no-undef */
const ID_CLIENT = '7665832';

function init() {
  SocialVk.init(ID_CLIENT);
}

function getIdClient() {
  return ID_CLIENT;
}

export default {
  init,
  getIdClient,
};
