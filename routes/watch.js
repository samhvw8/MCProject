let express = require('express');

let router = express.Router();

router.get('/:v', function (req, res, next) {

    //
    //	->	Display the index view with the video tag
    //
    res.render("watch", {
        title: 'Movie',
        url: req.params.v
    });

});

module.exports = router;
