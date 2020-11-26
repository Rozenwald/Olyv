import store from '../store/index';

function randElement(arr) {
  if (!arr) return undefined;

  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function getTitle(type) {
  const { titles } = store.state.dialogMessages;
  const title = titles[type];

  return randElement(title);
}

function getBody(type) {
  const { bodyes } = store.state.dialogMessages;
  const body = bodyes[type];

  return randElement(body);
}

export default {
  getTitle,
  getBody,
};
