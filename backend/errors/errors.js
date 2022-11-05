const PAGE_NOT_FOUND_ERROR = 'Страница не найдена.';
const DEFAULT_MESSAGE_ERROR = 'Ошибка по умолчанию.';
const USER_NOT_FOUND_ERROR = 'Пользователь по указанному _id не найден.';
const USER_PATCH_INCORRECT_ERROR = 'Переданы некорректные данные при обновлении профиля.';
const CARD_CREATION_ERROR = 'Переданы некорректные данные при создании карточки.';
const CARD_INCORRECT_ID_ERROR = 'Карточка с указанным _id не найдена.';
const CARD_INCORRECT_LIKE_DATA_ERROR = 'Переданы некорректные данные для постановки/снятия лайка.';
const INCORRECT_DATA_ERROR = 'Переданы некорректные данные.';
const USER_CREATION_DATA_ERROR = 'Переданы некорректные данные при создании пользователя.';
const USER_EXISTS_ERROR = 'Пользователь уже существует.';
const USER_PATCH_INCORRECT_AVATAR_ERROR = 'Переданы некорректные данные при обновлении аватара.';
const INCORRECT_LOGIN_OR_PASSWORD_ERROR = 'Некорректный логин или пароль.';
const UNAUTHORIZED_ERROR = 'Необходима авторизация';
const CONFLICT_ERROR = 'Конфликт. Пользователь с данным email уже существует.';
const FORBIDDEN_ERROR = 'Удаление запрещено.';
module.exports = {
  PAGE_NOT_FOUND_ERROR,
  DEFAULT_MESSAGE_ERROR,
  USER_NOT_FOUND_ERROR,
  USER_PATCH_INCORRECT_ERROR,
  USER_PATCH_INCORRECT_AVATAR_ERROR,
  CARD_CREATION_ERROR,
  CARD_INCORRECT_ID_ERROR,
  CARD_INCORRECT_LIKE_DATA_ERROR,
  INCORRECT_LOGIN_OR_PASSWORD_ERROR,
  USER_CREATION_DATA_ERROR,
  USER_EXISTS_ERROR,
  INCORRECT_DATA_ERROR,
  UNAUTHORIZED_ERROR,
  CONFLICT_ERROR,
  FORBIDDEN_ERROR,
};
