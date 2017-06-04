const express = require('express');

module.exports = (trackService, trackstatService, genreService, ratingService, reviewService, artistService)=>{
    const router = express.Router();
    const trackController = require('./tracks')(trackService);
    const trackstatController = require('./trackstat')(trackstatService);
    const genreController = require('./genre')(genreService);
    const ratingController = require('./rating')(ratingService);
    const reviewController = require('./review')(reviewService);
    const artistController = require('./artists')(artistService);
   
    router.use('/', trackController);
    router.use('/', trackstatController);
    router.use('/', genreController);
    router.use('/', ratingController);
    router.use('/', reviewController);
    router.use('/', artistController);
    
    return router;
}