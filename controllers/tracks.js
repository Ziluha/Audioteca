const express = require('express');
const out = require('../utils/out');
 
module.exports = (trackService)=>{
    const router = express.Router();
    
        router.get('/tracks', (req, res) => {
            trackService.qSearch(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.get('/tracks/:id', (req, res) => {
            trackService.gettrack(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });
   
        router.get('/tracks/:artist/:name', (req, res) => {
            trackService.add(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 

        router.delete('/tracks/:trackid', (req, res) => {
            trackService.deleteFromDb(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.get('/tracksgenre/:genreid', (req, res) => {
            trackService.gettracksByGenre(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.get('/tracksplaycount/:playcount', (req, res) => {
            trackService.gettracksByplaycount(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.get('/tracksartist/:artistid', (req, res) => {
            trackService.gettracksByartist(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });                
    return router;
}