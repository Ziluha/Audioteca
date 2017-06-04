const express = require('express');
const out = require('../utils/out');
 
module.exports = (ratingService)=>{
    const router = express.Router();
    
        router.get('/playcounts/:trackid', (req, res) => {
            ratingService.getRating(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 

        router.delete('/playcounts', (req, res) => {
            ratingService.deleteplaycount(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 

        router.post('/playcounts', (req, res) => {
            ratingService.playcounttrack(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 

        router.put('/playcounts/:playcount', (req, res) => {
            ratingService.changeplaycount(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 
              
    return router;
}