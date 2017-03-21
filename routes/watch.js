let express = require('express');

let router = express.Router();

router.get('/watch/:v', function (req, res, next) {

    //
    //	->	Display the index view with the video tag
    //
    res.render("index", {
        title: 'Movie',
        url: req.params.v
    });

});

module.exports = router;