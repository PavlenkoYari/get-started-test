/**
 * external libs
 */
const logger = require('log4js').getLogger('UserService');

/**
 * internal models
 */
const UserModel = require('../db/models/user.model');

class UserService {
    /**
     * get an users list
     *
     * @param {Object} filters
     * @param {Number} limit
     * @param {Number} offset
     */
    static async list(filters = {}, limit = 10, offset = 0) {
        logger.debug('list - processing');
        logger.trace('list - filters:', filters);

        try {
            const query = {};

            switch (filters.status) {
                case -1:
                    break;
                case 0:
                    query.deletedAt = {$ne: null};
                    break;
                case 1:
                default:
                    query.deletedAt = null;
                    break;
            }

            let sort = {_id: -1};

            if('sort' in filters) {
                sort = {};
                Object.entries(filters.sort).forEach(([key, value]) => {
                    sort[`${key}`] = value === 'asc' ? 1 : value === 'desc' ? -1 : 1;
                });
            }

            const cursor = UserModel.find(query);
            const total = await cursor.countDocuments();
            const userModels = await cursor.sort(sort).skip(Number(offset)).limit(Number(limit)).find();
            logger.trace('list - total:', total);
            logger.trace('list - user models:', userModels);

            logger.debug('list - has been processed with success status');
            return {total, items: userModels};
        } catch (e) {
            logger.debug('list - has been processed with fail status');
            logger.error('list - error message:', e.toString());
            return null;
        }
    }

    /**
     * create an user
     *
     * @param {Object} data
     * @return {Promise<UserModel|null>}
     */
    static async create(data = {}) {
        logger.debug('create - processing');
        logger.trace('create - data:', data);

        try {
            const userModel = new UserModel(data);
            if(data.password) {
                await userModel.setHashPassword(data.password);
            }
            await userModel.save();
            logger.trace('create - user model:', userModel);
            logger.debug('create - the user model has been updated');

            logger.debug('create - has been processed with success status');
            return userModel;
        } catch (e) {
            logger.debug('create - has been processed with fail status');
            logger.error('create - error message:', e.toString());
            return null;
        }
    }

    /**
     * get an user
     *
     * @param {String} data
     * @param {String} field
     * @returns {Promise<UserModel|null>}
     */
    static async get(data = '', field = '_id') {
        logger.debug('get - processing');
        logger.trace('get - field:', field, 'data:', data);

        try {
            const userModel = await UserModel.findOne({[field]: data});
            logger.trace('get - user model:', userModel);

            logger.debug('get - has been processed with success status');
            return userModel;
        } catch (e) {
            logger.debug('get - has been processed with fail status');
            logger.error('get - error message:', e.toString());
            return null;
        }
    }

    /**
     * update an user
     *
     * @param {String} filter
     * @param {Object} data
     * @param {String} field
     * @returns {Promise<UserModel|null>}
     */
    static async update(filter = '', data = {}, field = '_id') {
        logger.debug('update processing');
        logger.trace('update id:', filter, 'data:', data, 'field:', field);

        try {
            const updatedUserModel = await UserModel.findOneAndUpdate({[field]: filter}, {$set: data}, {new: true});
            logger.trace('update updated user model:', updatedUserModel);
            logger.debug('update the user model has been updated');

            logger.debug('update has been processed with success status');
            return updatedUserModel;
        } catch (e) {
            logger.debug('update has been processed with fail status');
            logger.error('update error message:', e.toString());
            throw e;
        }
    }

    /**
     * Delete an user
     *
     * @param {String} data
     * @param {String} field
     * @returns {Promise<Boolean>}
     */
    static async delete(data = '', field = '_id') {
        logger.debug('delete - processing');
        logger.trace('delete - field:', field, 'data:', data);

        try {
            await UserModel.findOneAndRemove({[field]: data});

            logger.debug('delete - has been processed with success status');
            return true;
        } catch (e) {
            logger.debug('delete - has been processed with fail status');
            logger.error('delete - error message:', e.toString());
            return false;
        }
    }
}

module.exports = UserService;
