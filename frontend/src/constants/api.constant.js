export const API_BASE_URL = process.env.REACT_APP_BASE_URL;

//AUTH
const AUTH = '/auth';

//Auth route
export const API_LOGIN_URI = `${AUTH}/login`;
export const API_REGISTRATION_URI = `${AUTH}/registration`;
export const API_REFRESH_ACCESS_TOKEN_URI = `${AUTH}/token/refresh`;
//Auth with social
const SOCIAL = `${AUTH}/social`;
export const API_SOCIAL_GOOGLE = `${SOCIAL}/google`;

//USER
const USERS = '/users';
export const API_USERS_LIST = USERS;
export const API_USERS_CREATE = USERS;
export const API_MAKE_USERS_UPDATE = (id) => `${USERS}/${id}`;
export const API_MAKE_USERS_GET = (id) => `${USERS}/${id}`;
export const API_MAKE_USERS_DELETE = (id) => `${USERS}/delete/${id}`;

//PROFILE
const PROFILE = '/profile';
export const GET_PROFILE = PROFILE;
export const UPDATE_PROFILE = PROFILE;
