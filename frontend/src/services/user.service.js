/**
 * external libs
 */
import axios from 'axios';
/**
 * internal services
 */
import UserModel from '../model/user.model';
/**
 * helpers
 */
import qs from '../helpers/querystring';
/**
 * internal constants
 */
import {
    API_USERS_LIST,
    API_USERS_CREATE,
    API_MAKE_USERS_GET,
    API_MAKE_USERS_DELETE,
    API_MAKE_USERS_UPDATE,
} from '../constants/api.constant';

class UserService {
    static async create(userData) {
        const {data, error, status} = await axios.post(API_USERS_CREATE, userData);

        if(status === false) {
            throw new Error(error);
        }

        return new UserModel(data);
    }

    static async update(id, userData) {
        const {data, error, status} = await axios.post(API_MAKE_USERS_UPDATE(id), userData);

        if(status === false) {
            throw new Error(error);
        }

        return new UserModel(data);
    }

    static async get(id) {
        const {data, error, status} = await axios.get(API_MAKE_USERS_GET(id));

        if(status === false) {
            throw new Error(error);
        }

        return new UserModel(data);
    }

    static async list(page = 1, limit = 10, filters = {}) {
        const {data, error, status} = await axios.get(
            `${API_USERS_LIST}?${qs.stringify({
                filters,
                offset: (page - 1) * limit,
                limit,
            })}`,
        );

        if(status === false) {
            throw new Error(error);
        }

        data.items = data.items.map((user) => new UserModel(user));

        return data;
    }

    static async delete(id) {
        const {data, error, status} = await axios.post(API_MAKE_USERS_DELETE(id));

        if(status === false) {
            throw new Error(error);
        }

        return data;
    }
}

export default UserService;
