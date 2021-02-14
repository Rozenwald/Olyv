const getters = {
  getTitles: (state) => state.titles,
  getBodyes: (state) => state.bodyes,
};

const state = {
  titles: {
    error: ['Ошибка', 'Ой...', 'Что-то пошло не так'],
    warning: ['Предупреждение'],
    needToAuth: ['Здравствуйте, гость'],
    rules: ['Правила и политика конфиденциальности'],
  },

  bodyes: {
    needAgainAuth: [''],
    needToVerification: ['Для того чтобы брать заказы на исполнение, вы должны подтвердить свою личность'],
    needToAuth: ['Для полученения доступа ко всем функциям приложения необходимо авторизироваться'],
    notAuthentucate: ['Ошибка доступа. Попробуйте повторить авторизацию'],
    notExist: ['Не существует'],
    notSuccess: ['Непредвиденная ошибка сервера'],
    tokenExpire: ['Время ожидания истекло, повторите процедуру смены пароля с самого начала'],
    invalidEmail: ['Проверьте корректность указанной почты', 'Указан неверный почтовый адрес'],
    invalidPassword: ['Пароль должен содержать больше 6 символов'],
    existEmail: ['Указанная почта уже зарегистрирована'],
    invalidAuthData: ['Неверный логин или пароль'],
    errorRegistration: ['Регистрация не удалась. Повторите попытку позже'],
    errorAuth: ['Авторизация не удалась. Повторите попытку позже'],
    standartError: ['Непредвиденный случай. Наши самураи уже занимаются её решением', 'Непредвиденная проблема. Повторите попытку позже', 'У нас произошли технические неполадки. Попробуйте повторить попытку позже', 'У нас произошли технические шоколадки. Попробуйте повторить попытку позже'],
    errorCreateOrder: ['Не удалось создать заказ'],
    errorDeleteOrder: ['Не удалось удалить заказ'],
    errorEditOrder: ['Не удалось отредактировать заказ'],
    errorAcceptOrder: ['Не удалось принять исполнителя. Возможно, исполнитель отменил свой отклик'],
    errorCreateResponse: ['Не удалось откликнуться на заказ. Возможно, заказчик уже выбрал исполнителя'],
    errorDeleteResponse: ['Не удалось отказаться от заказа. Возможно, Вас уже выбрали исполнителем. Предупреждаем, невыполнение заказа сказывается на Вашей репутации'],
    errorCompletedOrder: [],
    errorPhoto: ['Не удалось загрузить фотографию. Попробуйте позже или выберите другое изображение'],
    invalidPhoto: ['Неподдерживаемый формат фотографии. Попробуйте загрузить другое изображение'],
    awaitAdminResponse: ['Вы уже отправили запрос. Пожалуйста, дождитесь ответа службы поддержки'],
    enterName: ['Укажите ваше имя'],
    addKeyWordError: ['Не удалось добавить ключевое слово'],
    removeKeyWordError: ['Не удалось удалить ключевое слово'],
    errorAddress: ['Укажите адрес', 'Вы забыли указать адрес'],
    errorCost: ['Укажите желаемую цену'],
    invalidCost: ['Неверный формат цены'],
    invalidDescription: ['Описание должно быть больше 10 символов', 'Пожалуйста, пишите заказ подробнее'],
  },
};

export default {
  namespaced: true,
  getters,
  state,
};
