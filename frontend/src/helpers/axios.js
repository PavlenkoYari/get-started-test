/**
 * external libs
 */
import axios from 'axios';
/**
 * internal constants
 */
import {API_BASE_URL, API_REFRESH_ACCESS_TOKEN_URI} from '../constants/api.constant';
/**
 * internal services
 */
import AuthService from '../services/auth.service';

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

const onAccessTokenFetched = (access_token) => {
    subscribers = subscribers.filter((callback) => callback(access_token));
};
const addSubscriber = (callback) => subscribers.push(callback);
const refreshToken = () => {
    if(AuthService.isRefreshTokenValid === false) {
        AuthService.logout();
        subscribers = [];
        return void 0;
    }
    isAlreadyFetchingAccessToken = true;
    AuthService.refresh().then(() => {
        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched();
    });
};
const waitResponseRefreshing = (req) => {
    return new Promise((resolve) => {
        addSubscriber(() => {
            req.headers.Authorization = 'Bearer ' + AuthService.accessToken;
            return resolve(axios(req));
        });
    });
};
const waitRequestRefreshing = (req) => {
    return new Promise((resolve) => {
        addSubscriber(() => {
            req.headers.Authorization = 'Bearer ' + AuthService.accessToken;
            return resolve(req);
        });
    });
};

axios.interceptors.request.use(async (req) => {
    if(isAlreadyFetchingAccessToken) {
        if(req.url === API_REFRESH_ACCESS_TOKEN_URI) {
            return req;
        }

        return waitRequestRefreshing(req);
    }

    if(AuthService.isAuthenticated) {
        if(AuthService.checkAccessTokenExpiration() && !isAlreadyFetchingAccessToken) {
            refreshToken();
            return waitRequestRefreshing(req);
        }

        req.headers.Authorization = 'Bearer ' + AuthService.accessToken;
    }

    return req;
});

axios.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const {
            config: originalRequest,
            response: {status},
        } = error;

        if(status === 401) {
            if(!isAlreadyFetchingAccessToken) {
                refreshToken();
            }
            return waitResponseRefreshing(originalRequest);
        }

        return Promise.reject(error);
    },
);

axios.defaults.baseURL = API_BASE_URL;
