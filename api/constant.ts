const API = '/api';
const AUTH_PATH = '/auth';

export const LOGOUT_URL = '/logout';
export const LOGIN_URL = `${AUTH_PATH}/login`;
export const REGISTER_URL = `${AUTH_PATH}/register`;
export const CSRF_TOKEN_URL = `${AUTH_PATH}/create-token`;

export const QUIZ_PATH = API + '/quiz';

export const CATEGORY_PATH = API + '/category';

export const GLOSSARY_PATH = API + '/glossary';

export const QUESTION_PATH = API + '/question';

export const USER_HISTORY_PATH = API + '/user-history';

export const USER_PATH = API + '/user';

export const KNOWLEDGE_BASE_PATH = API + '/knowledge-base';

export const CHANGE_PASSWORD_URL = `${USER_PATH}/change-password`;
export const VERIFY_OLD_PASSWORD_URL = `${USER_PATH}/verify-password`;
