import {formatDate} from '../utils';

class BaseModel {
    constructor(data = {}) {
        this.createdAt = data.createdAt ? formatDate(data.createdAt) : undefined;
    }
}

export default BaseModel;
