// 0x0A LF
// 0x0D CR
module.exports.sanitizeString = (str, length) => {
    if(typeof str !== 'string') return '';

    str = module.exports.trim(
        str.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\uFEFF]/g, '')
            .replace(/[\x0A\x0D]/g, ' ')
            .replace(/\s+/g, ' '),
    );

    if(length) {
        str = str.slice(0, length);
    }

    return str;
};
module.exports.trim = str => str.replace(/^\s*|\s*$/g, '');

module.exports.randomString = (length = 8) => {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * charSet.length);
        result += charSet.substring(random, random + 1);
    }

    return result;
};

module.exports.validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
};

module.exports.validatePassword = password => password.length > 5 && password.length <= 50;
