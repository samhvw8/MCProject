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

    let data = fs.readFileSync('./public/data.json');

    let obj = JSON.parse(data);

    res.render("index", {
        test: obj['data']
    });

});

module.exports = router;
