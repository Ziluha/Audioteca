const express = require('express');
const out = require('../utils/out');
 
module.exports = (genreService)=>{
    const router = express.Router();
    
        router.post('/genres', (req, res) => {
            genreService.setGenreTotrack(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 
              
    return router;
}