const router = require('express').Router();
const mysql_singleton = require('mysql-singleton');
const services = require('../../services/auth/loginService');
const some = require('../../utils/some');

router.post('/login',login);
router.post('/getData',getData);
module.exports = router;

async function login(req,res){
    try{
        const connection = await mysql_singleton.getConnectionPromise();
        const data = await services.loginServices(req.body.username,req.body.password,connection);
        connection.release();
        if(data.length == 0){
            res.status(200).json({status: false, message: "please check creds"});
        }else{
            const token = await some.getToken(req.body.username);
            res.status(200).json({status: true, data: data, token: token});
        }
    }catch(error){
        res.send("error");
        console.log(error);
    }
    
}

function getData(req,res){
    res.send("here's tou data");
}