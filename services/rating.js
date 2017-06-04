const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);


module.exports = (rating) => {
    return {
       playcounttrack: playcounttrack,
       deleteplaycount: deleteplaycount,
       changeplaycount: changeplaycount,
       getRating: getRating
    };

    function getRating(req, res){ //ok
        return new Promise((resolve, reject)=>{
          dbcontext.track.findOne({
              where: {id: req.params.trackid},
              include:{
                    model: dbcontext.profile,
                    as: 'trackrating'
                } 
          }).then((restracks) => {
              resolve({success: true, playcount: restracks});
          }).catch(reject);
        });
    };

    function playcounttrack(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.track.findOne({
               where: { id: req.body.trackid }
           }).then((newtrack) => {
               if(newtrack)
                newtrack.addTrackrating(res.locals.user.id, { playcount : req.body.playcount }).
                then((restrack) => {
                    resolve({success: true, playcount: restrack});
            }).catch(reject);
           }).catch(reject);
        });
    };

    function deleteplaycount(req, res){ //ok
        return new Promise((resolve, reject)=>{
           rating.destroy({
               where: { 
                   trackId: req.body.trackid,
                   profileId: res.locals.user.id
                 }
           }).then((restrack) => {
                resolve({success: true, data: restrack});
            }).catch(reject);
        });
    };

    function changeplaycount(req, res){ //ok
        return new Promise((resolve, reject)=>{
           rating.update(
               {playcount: req.params.playcount},
               {where: { 
                    trackId: req.body.trackid,
                    profileId: res.locals.user.id
                }}).then((restrack) => {
                resolve({success: true, data: restrack});
            }).catch(reject);
        });
    };
          
};