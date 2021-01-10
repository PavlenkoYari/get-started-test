module.exports = {
    "version": 1,
    "http": {"host": "::", "port": 3001},
    "mongo": "mongodb://localhost:27017/get-started-test",
    "env": {
        "jwtAlgorithm": "HS256",
        "lifetimeAuthToken": 3600,
        "lifetimeResetToken": 7200,
        "googleAuthClientID": "1061796999198-2i4ne22h1koklo9pthbuttict69tegcv.apps.googleusercontent.com",
        "appKey": "NTg3YWIyNjVhNTAzYzljMDI2Mjg0MzE2OGI1NmNiZmE4MzJlOWIzN2FmZmU1OGMwMDMwOThhNjk3NDRkYjA0YQ=="
    },
    "log4js": {
        "appenders": {
            "console": {"type": "console", "layout": {"type": "json", "limit": 30}},
            "file": {"type": "file", "filename": "./logs/application.log", "maxLogSize": 20480000, "backups": 10}
        }, "categories": {"default": {"appenders": ["console"], "level": "ALL"}}
    }
}
