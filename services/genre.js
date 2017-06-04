const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);


module.exports = (genres) => {
    return {
       setGenreTotrack: setGenreTotrack
    };

    function setGenreTotrack(req, res){
        return new Promise((resolve, reject)=>{
            genres.findOrCreate({
                where:{
                    genre: req.body.genre
                }
            }).spread((newGenre, created) => {
                newGenre.addTrackgenre(req.body.trackid).then((restrack) => {
                    resolve({success: true, genre: restrack});
                }).catch(reject);
            }).catch(reject);
        });
    };        
};