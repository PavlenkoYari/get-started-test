export const LANDING_PAGE_URI = '/';

export const AUTH_PAGE_URI = '/auth';

//admin-route
export const ADMIN = '/admin';
export const ADMIN_USERS_PAGE_URI = `${ADMIN}/users`;

//user
export const MAKE_UPDATE_ADMIN_USERS_PAGE_URI = (id) => `${ADMIN_USERS_PAGE_URI}/${id}`;

//profile
export const PROFILE_PAGE = '/profile';
