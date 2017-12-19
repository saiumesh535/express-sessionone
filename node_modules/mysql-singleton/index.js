'use strict'
const mysql = require('mysql');
var pool;

module.exports = {
    config: function(config){
        if(!(config instanceof Object)) throw Error("config must be a Object")
        if(pool) return pool;
        pool = mysql.createPool(config);
        return pool;
    },
    getConnection: function(callback){
        if(!pool) callback(true,"Config not set");
        pool.getConnection(function(err,connection){
            if(err) callback(true,err);
            callback(false,connection);
        }) 
    },
    getConnectionPromise: function(){
        return new Promise((resolve,reject)=>{
            if(!pool) reject("Config not set");
            pool.getConnection(function(err,connection){
                (err ? reject(err) : resolve(connection));
            })
        })
    }
}