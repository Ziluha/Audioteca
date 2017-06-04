const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);

module.exports = (artists) => {
    return {
       deleteartist: deleteartist
    };

    function deleteartist(req, res){
        return new Promise((resolve, reject)=>{
          artists.destroy({
               where: {
                   id: req.params.artistid
                }
           }).then((resData) => {
                resolve({success: true, data: resData});
           }).catch(reject);
           console.log('artist deleted');
        });
    };
};