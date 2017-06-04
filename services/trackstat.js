const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);


module.exports = (trackstat) => {
    return {
       addTrack: addTrack,
       changeStatus: changeStatus,
       deleteTrack: deleteTrack,
       getAllTracks: getAllTracks,
       getTracksByStatus: getTracksByStatus,
       getTrack: getTrack     
    };

    function getTrack(req, res){ //ok
        return new Promise((resolve, reject)=>{
           dbcontext.track.findOne({
                where:{id: req.params.trackid},
                include:[{
                    all: true,
                    nested: true,
                    required: false
                }]
            }).then((restrack) => {
                resolve({success: true, track: restrack});
            }).catch(reject);
        });
    };

    function addTrack(req, res){ //ok
        return new Promise((resolve, reject)=>{
            dbcontext.track.findOne({
                where:{id: req.params.trackid}
            }).then((newtrack) => {
                newtrack.addTrackstat(res.locals.user.id, { status: req.body.status }).
                then((restrack) => {
                    resolve({success: true, track: newtrack, status: req.body.status});
                }).catch(reject);
            });   
        });
    };

    function deleteTrack(req, res){ //ok
        return new Promise((resolve, reject)=>{
            trackstat.destroy({
                where:{
                    trackId:req.params.trackid,
                    profileId:res.locals.user.id
                }
            }).then((restrack) => {
                resolve({success: true, data: restrack});
            }).catch(reject);
        });
    };
 
    function changeStatus(req,res){ //ok
        return new Promise((resolve, reject) => {
            trackstat.update(
                {status: req.params.status},
                {where: {trackId: req.body.trackid,
                         profileId: res.locals.user.id}}
            ).then((restrack) => {
                resolve({success: true, data: restrack, newStatus: req.params.status});
            }).catch(reject);
        });
    };

    function getAllTracks(req, res){ //ok
        var localLimit = 100;
        return new Promise((resolve, reject) => {
            if(req.query.limit)
                localLimit = parseInt(req.query.limit);
            dbcontext.track.findAll({
                //raw: true,
                limit: localLimit,
                include:[{
                    model: dbcontext.profile,
                    as:"trackstat",
                    where:{id: res.locals.user.id}
                },{
                    model: dbcontext.artist,
                    as: "trackartist"
                }]
            })
            .then((restrack) => {
                resolve({success: true, tracks: restrack});
            }).catch(reject);
        });
    };

    function getTracksByStatus(req, res){ //ok
        var localLimit = 100;
        return new Promise((resolve, reject) => {
            if(req.query.limit)
                localLimit = parseInt(req.query.limit);
            dbcontext.trackstat.findAll({
                where:{ profileId: res.locals.user.id,
                        status: req.params.status},
                limit: localLimit,
                raw: true
            })
            .then((restrack) => {
                resolve({success: true, track: restrack});
            }).catch(reject);
        });
    };              
};