const express = require('express');
const out = require('../utils/out');
 
module.exports = (artistService)=>{
    const router = express.Router();
    
        router.delete('/artists/:artistid', (req, res) => {
            artistService.deleteartist(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 
              
    return router;
}