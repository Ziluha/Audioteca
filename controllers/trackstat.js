const express = require('express');
const out = require('../utils/out');
 
module.exports = (trackstatService)=>{
    const router = express.Router();
    
        router.get('/trackstats', (req, res) => {
            trackstatService.getAllTracks(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });
        
        router.get('/trackstats/:status', (req, res) => {
            trackstatService.getTracksByStatus(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.get('/trackstat/:trackid', (req, res) => {
            trackstatService.getTrack(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.post('/trackstats/:trackid', (req, res) => {
            trackstatService.addTrack(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.delete('/trackstats/:trackid', (req, res) => {
            trackstatService.deleteTrack(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });

        router.put('/trackstats/:status', (req, res) => {
            trackstatService.changeStatus(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        });                  
     return router;
}