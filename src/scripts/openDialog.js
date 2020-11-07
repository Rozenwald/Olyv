import store from '../store/index';

function firstBtnFunction(funсtionFirstBtn) {
  if (funсtionFirstBtn instanceof Function) {
    funсtionFirstBtn();
  }
  // store.dispatch('setVisibleDialog', false);
}
function secondBtnFunction(funсtionSecondBtn) {
  if (funсtionSecondBtn instanceof Function) {
    funсtionSecondBtn();
  }
  // store.dispatch('setVisibleDialog', false);
}
function open(title, text, button1text, button2text, funсtionFirstBtn, funсtionSecondBtn) {
  const data = {
    title,
    text,
    button1text,
    button2text,
    funсtionFirstBtn,
    funсtionSecondBtn,
  };
  store.dispatch('setDataDialog', data);
  store.dispatch('setVisibleDialog', true);
  firstBtnFunction(funсtionFirstBtn);
  secondBtnFunction(funсtionSecondBtn);
}
export default {
  open,
};
