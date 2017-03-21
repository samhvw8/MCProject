/**
 * Created by samhv on 3/21/17.
 */
let express = require('express');
let fs = require('fs');
let router = express.Router();

router.get('/', function (req, res, next) {

    //
    //	->	Display the index view with the video tag
    //

    let files = fs.readdirSync('./data');


    res.render("all", {
        test: files
    });

});

module.exports = router;
