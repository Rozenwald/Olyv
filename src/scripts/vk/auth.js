/* eslint-disable no-undef */
const PERMISSIONS = [
  'offline',
];

function login() {
  return new Promise(((success) => {
    SocialVk.login(PERMISSIONS, success);
  }));
}

export default {
  login,
};
