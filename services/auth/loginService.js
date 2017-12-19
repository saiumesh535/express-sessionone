

const mysql = require('mysql');
module.exports = {
    loginServices : (username,password,connection)=>{
        return new Promise((resolve,reject)=>{
            const query = mysql.format("select * from users where username = ? and password = ?",[username,password]);
            console.log(query);
            connection.query(query,(err,result)=>{
               (err ? reject(err) : resolve(result))
            })
        })
    }
}