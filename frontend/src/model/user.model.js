import BaseModel from './base.model';

export default class UserModel extends BaseModel {
    constructor(data = {}) {
        super();
        data = data || {};

        this.id = data.id || (typeof data === 'string' && data) || '';
        this.email = data.email || '';
        this.first_name = data.first_name || '';
        this.last_name = data.last_name || '';
        this.age = data.age || '';
    }
}
