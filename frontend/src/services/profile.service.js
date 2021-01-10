/**
 * external libs
 */
import axios from 'axios';
/**
 * internal models
 */
import UserModel from '../model/user.model';
/**
 * internal constants
 */
import {GET_PROFILE, UPDATE_PROFILE} from '../constants/api.constant';

export default class ProfileService {
    static async get() {
        const {data, error, status} = await axios.get(GET_PROFILE);

        if(status === false) {
            throw new Error(error);
        }

        return new UserModel(data);
    }

    static async update(profile) {
        const {data, error, status} = await axios.post(UPDATE_PROFILE, profile);

        if(status === false) {
            throw new Error(error);
        }

        return new UserModel(data);
    }
}
