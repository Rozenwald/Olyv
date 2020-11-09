import store from '../store/index';

function close() {
  store.dispatch('setVisibleDialog', false);
}

function buttonsFunction(action) {
  return () => {
    if (action instanceof Function) action();
    close();
  };
}

function open(title, text, button1, button2, funсtionFirstBtn, funсtionSecondBtn) {
  const firstBtnFunction = buttonsFunction(funсtionFirstBtn);
  const secondBtnFunction = buttonsFunction(funсtionSecondBtn);

  const data = {
    title,
    text,
    button1,
    button2,
    firstBtnFunction,
    secondBtnFunction,
  };
  store.dispatch('setDataDialog', data);
  store.dispatch('setVisibleDialog', true);
}

export default {
  open,
  close,
};
