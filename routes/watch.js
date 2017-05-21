let express = require('express');
let fs = require('fs');
let router = express.Router();

router.get('/:v', function (req, res, next) {

    //
    //	->	Display the index view with the video tag
    //

    let data = fs.readFileSync('./storage/data.json');

    let obj = JSON.parse(data);
    let obj_data = obj['data'];

    for (let i = 0; i < obj_data.length; i++) {
        if (obj_data[i]['video'] === req.params.v) {

            if (obj_data[i]['hd'] === true) {
                res.render("watch", {
                    title: obj_data[i]['name'],
                    hd: true,
                    _hd: req.params.v,
                    _360p: req.params.v.replace('.mp4', '-360.mp4')

                });
                return;
            }
            res.render("watch", {
                title: obj_data[i]['name'],
                hd: false,
                _hd: req.params.v,

            });
            return;
        }
    }

});

module.exports = router;
