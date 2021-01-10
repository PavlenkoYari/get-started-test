/**
 * external libs
 */
import axios from 'axios';
/**
 * internal constants
 */
import {API_LOGIN_URI, API_REFRESH_ACCESS_TOKEN_URI, API_REGISTRATION_URI} from '../constants/api.constant';
import {AUTH_PAGE_URI} from '../constants/uri.constant';
import {
    USER_INFO_KEY,
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    ACCESS_TOKEN_EXPIRATION_KEY,
} from '../constants/storage.constant';

class AuthService {
    static get accessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    static set accessToken(token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);

        try {
            const {email, exp} = JSON.parse(
                atob(AuthService.accessToken.split('.')[1]),
            );

            localStorage.setItem(USER_INFO_KEY, JSON.stringify({email}));
            this.token_expiration = exp;
        } catch (e) {
        }
    }

    static get refreshAccessToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    static set refreshAccessToken(token) {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }

    static get isAuthenticated() {
        return Boolean(this.accessToken);
    }

    static get isRefreshTokenValid() {
        return Boolean(this.refreshAccessToken) && this.checkRefreshTokenExpired() === false;
    }

    static login(email, password) {
        return axios.post(API_LOGIN_URI, {
            email,
            password,
        });
    }

    static registration(email, password) {
        return axios.post(API_REGISTRATION_URI, {
            email,
            password,
        });
    }

    static refresh() {
        return axios
            .post(API_REFRESH_ACCESS_TOKEN_URI, {
                refresh_token: this.refreshAccessToken,
            })
            .then(({status, data: {access_token, refresh_token}}) => {
                if(status === false) {
                    return this.logout();
                }
                this.accessToken = access_token;
                this.refreshAccessToken = refresh_token;
            });
    }

    static logout() {
        const self = AuthService;
        localStorage.removeItem(USER_INFO_KEY);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(ACCESS_TOKEN_EXPIRATION_KEY);
        self.setIsAuth(false);
        return self.history.push(AUTH_PAGE_URI);
    }

    static get token_expiration() {
        return localStorage.getItem(ACCESS_TOKEN_EXPIRATION_KEY);
    }

    static set token_expiration(exp) {
        return localStorage.setItem(ACCESS_TOKEN_EXPIRATION_KEY, exp);
    }

    static get user_info() {
        return JSON.parse(localStorage.getItem(USER_INFO_KEY) || '{}');
    }

    static checkAccessTokenExpiration() {
        const now = Date.now();
        const exp = Number(this.token_expiration) * 1000;
        return now + 60 * 5 * 1000 >= exp;
    }

    static checkRefreshTokenExpired() {
        try {
            const {exp} = JSON.parse(atob(AuthService.refreshAccessToken.split('.')[1]));

            const now = Date.now();
            return now + 60 * 1000 >= exp * 1000;
        } catch (e) {
        }
    }
}

AuthService.history = {
    push(path) {
        return Window.history.go(path);
    },
};

export default AuthService;
