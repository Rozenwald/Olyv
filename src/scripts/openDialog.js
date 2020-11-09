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

// eslint-disable-next-line no-unused-vars
function buttonsFunctionDefault(action) {
  // eslint-disable-next-line func-names
  return function () {
    if (action instanceof Function) {
      action();
    }
    close();
  };
}

function open(title, text, button1text, button2text, funсtionFirstBtn, funсtionSecondBtn) {
  const firstBtnFunction = buttonsFunction(funсtionFirstBtn);
  const secondBtnFunction = buttonsFunction(funсtionSecondBtn);

  const data = {
    title,
    text,
    button1text,
    button2text,
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
