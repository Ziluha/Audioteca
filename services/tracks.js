const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);
const genres = require('../services/genre')(dbcontext.genre);
const rating = require('../services/rating')(dbcontext.rating);
const review = require('../services/review')(dbcontext.review);
const trackatrist = dbcontext.trackatrist;

module.exports = (track, artist) => {
    return {
        gettrack: gettrack,
        qSearch: qSearch,
        add: add,
        deleteFromDb: deleteFromDb,
        gettracksByGenre: gettracksByGenre,
        gettracksByplaycount: gettracksByplaycount,
        gettracksByartist: gettracksByartist
    };

    function gettrack(req, res){ //ok
        return new Promise((resolve, reject)=>{
           track.findOne({
                where:{id: req.params.id},
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

    function qSearch(req, res){
        return new Promise((resolve, reject)=>{
           needle.getAsync('http://ws.audioscrobbler.com/2.0/?method=track.search&track='+req.query.q+'&api_key=6535f1dd11b4902258e05afea300b85d&format=json').
           then((result)=>{
               resolve(result.body.results.trackmatches);
           });
        });
    } 

    function add(req, res){ //ok
        return new Promise((resolve, reject) => {
            var image;
            var info;
            dbcontext.track.findOne({
                where: {name: req.params.name},
                include:[{
                        all: true,
                        nested: true,
                        required: false
                    }]
            }).then((dbtrack) => {
                if(!dbtrack){
                    needle.getAsync('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=6535f1dd11b4902258e05afea300b85d&artist='+req.params.artist+'&track='+req.params.name+'&format=json').
                    then((founded) => {
                        if(founded.body.track.album != null)
                            image = founded.body.track.album.image[2]["#text"];
                        else image = "http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif";
                        if(founded.body.track.wiki != null)
                            info = founded.body.track.wiki.content;
                        else info = 'Can not find info for this song';
                        track.findOrCreate({
                            where:{
                                name: founded.body.track.name,
                                playcount:parseInt(founded.body.track.playcount),
                                duration:parseInt(founded.body.track.duration),
                                annotation: info,
                                img: image
                            }
                        }).spread((newtrack, created) => {
                            artist.findOrCreate({
                                where: {
                                    name:founded.body.track.artist.name,
                                    website:'https://www.google.by/search?q='+ founded.body.track.artist.name
                                }
                            }).spread((newartist, created) => {
                                newtrack.addTrackartist(newartist).then(() => {
                                    dbcontext.track.findOne({
                                        where:{id: newtrack.id},
                                        include:[{
                                            all: true,
                                            nested: true,
                                            required: false
                                        }]
                                    }).then((restrack) => {
                                        resolve({success: true, track: restrack});
                                    }).catch(reject);
                                }).catch(reject);
                            });
                        });
                    })
                } else{
                   resolve({success: true, track: dbtrack});
                }
            }) 
        });
    };

    function deleteFromDb(req, res){ //ok
        return new Promise((resolve, reject) => {
            track.destroy({
               where: {
                   id: req.params.trackid
                }
           }).then((resData) => {
                resolve({success: true, data: resData});
           }).catch(reject);
        });
    };    

    function gettracksByGenre(req, res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.genre.findOne({
                where:{id: req.params.genreid},
                include:[{
                    model: dbcontext.track,
                    as: 'trackgenre'
                }]
            }).then((tracks)=>{
                resolve({success: true, track: tracks});
            }).catch(reject);
        });
    };

    function gettracksByplaycount(req, res){ //ok
        return new Promise((resolve, reject) => {
            track.findAll({
                where:{playcount: req.params.playcount}
            }).then((tracks)=>{
                resolve({success: true, track: tracks});
            }).catch(reject);
        });
    }     

    function gettracksByartist(req, res){ //ok
        return new Promise((resolve, reject) => {
            dbcontext.artist.findOne({
                where:{id: req.params.artistid},
                include:[{
                    model: dbcontext.artist,
                    as: 'trackartist'
                }]
            }).then((tracks)=>{
                 resolve({success: true, track: tracks});
            }).catch(reject);
        });
    }           
};