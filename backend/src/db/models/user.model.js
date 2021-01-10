/**
 * external libs
 */
const bcrypt = require('bcrypt');
const config = require('jsconfig');
const mongoose = require('mongoose');

const {passwordSaltRounds = 10} = config;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            max: 100,
            unique: true,
            trim: true
        },
        first_name: {
            type: String,
            trim: true
        },
        last_name: {
            type: String,
            trim: true
        },
        age: {
            type: Number,
            min: 1,
            max: 100
        },
        password: {
            type: String,
        }
    },
    {
        timestamps: true,
    },
);

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.setHashPassword = async function (password) {
    return await new Promise((resolve, reject) =>
        bcrypt.genSalt(
            passwordSaltRounds,
            (err, salt) =>
                (err && reject(err)) ||
                bcrypt.hash(password, salt, (error, hash) => {
                    (error && reject(error)) || resolve((this.password = hash));
                }),
        ),
    );
};

userSchema.methods.toResponse = function () {
    return {
        id: this._id,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        age: this.age,
        createdAt: this.createdAt,
    };
};

module.exports = mongoose.model('User', userSchema);
