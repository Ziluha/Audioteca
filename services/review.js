const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);

module.exports = (review) => {
    return {
       addReview: addReview,
       deleteReview: deleteReview,
       changeReview: changeReview,
       getReviews: getReviews
    };

    function getReviews(req, res){ //ok
        return new Promise((resolve, reject)=>{
          dbcontext.track.findOne({
              where: {id: req.params.trackid},
              include:{
                    model: dbcontext.profile,
                    as: 'trackreview'
                } 
          }).then((restracks) => {
              resolve({success: true, review: restracks});
          }).catch(reject);
        });
    };

    function addReview(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.track.findOne({
               where: {id: req.body.trackid}
           }).then((newtrack) => {
                newtrack.addTrackreview(res.locals.user.id, { text : req.body.review }).
                then((restrack) => {
                    resolve({success: true, review: restrack});
             }).catch(reject);
           }).catch(reject);
        });
    };

    function deleteReview(req, res){
        return new Promise((resolve, reject)=>{
           review.destroy({
               where: {
                   trackId: req.body.trackid,
                   profileId: res.locals.user.id
                }
           }).then((restrack) => {
                resolve({success: true, data: restrack});
            }).catch(reject);
        });
    };

    function changeReview(req, res){
        return new Promise((resolve, reject)=>{
           review.update(
               {text: req.body.review},
               {where: {
                   trackId: req.body.trackid,
                   profileId: res.locals.user.id
                }
            }).then((restrack) => {
                resolve({success: true, data: restrack});
            }).catch(reject);
        });
    };
          
};