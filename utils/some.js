const jsonwebtoken = require('jsonwebtoken');
const configs = require('./config');
module.exports = {
    getToken: (username)=>{
        return new Promise((res,reje)=>{
            const token = jsonwebtoken.sign({
                username: username
              }, configs.tokenKey);
            res(token);
        })
    }
}