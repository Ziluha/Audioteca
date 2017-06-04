var express = require("express");
var router = express.Router();

router.use((req,res)=>{
    if (res.locals.user)
        res.render('index');
    else
        res.render('login');
});

module.exports = router;