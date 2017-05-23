/**
 * Created by samhv on 5/23/17.
 */
let express = require('express');
let fs = require('fs');
let router = express.Router();


let ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static');
let ffmpeg = require('ffmpeg');

let multer = require('multer');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage')
    },
    filename: function (req, file, cb) {

        let getFileExt = function (fileName) {
            let fileExt = fileName.split(".");
            if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 )) {
                return "";
            }
            return fileExt.pop();
        };

        let baseName = req.body.title + '-' + Date.now();
        let videofn = baseName + '.mp4';
        let imgfn = baseName + '.png';

        req.body.videofn = videofn;
        req.body.imgfn = imgfn;

        cb(null, videofn);
    }
});

let upload = multer({storage: storage});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('upload', {
        flash: false,
        title: 'Upload'
    });
});

router.post('/',
    upload.single('videoupload'),

    function (req, res, next) {

        console.log(req.body);

        let getFileExt = function (fileName) {
            let fileExt = fileName.split(".");
            if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 )) {
                return "";
            }
            return fileExt.pop();
        };

        if (getFileExt() !== 'mp4') {
            res.render('upload', {
                flash: true,
                title: 'Upload',
                msgType: 'warning',
                msg: 'Upload file not successfully | video file must be mp4 !!'
            });
        }

        next();

    },

    function (req, res, next) {

        let hd = false;

        ffprobe('./storage/' + req.body.videofn, {path: ffprobeStatic.path})
            .then(function (info) {
                if (info['streams'][0]['height'] > 360) {
                    hd = true;


                    try {
                        let process = new ffmpeg('./storage/' + req.body.videofn);
                        process.then(function (video) {
                            // Callback mode
                            video.setVideoSize('?x360', true, false, '#fff').save('./storage/' + baseName + '-360.mp4', function (error, file) {
                                if (!error)
                                    console.log('Video file: ' + './storage/' + req.body.videofn);
                            });
                        }, function (err) {
                            console.log('Error: ' + err);
                        });
                    } catch (e) {
                        console.log(e.code);
                        console.log(e.msg);
                        hd = false;
                    }


                }

            })
            .catch(function (err) {
                res.render('upload', {
                    flash: true,
                    title: 'Upload',
                    msgType: 'warning',
                    msg: 'Upload file not successfully'
                });

                return;
            });


        let data = fs.readFileSync('./storage/data.json');

        let obj = JSON.parse(data);
        obj['count'] = obj['count'] + 1;

        if (hd) {
            obj.data.push({name: req.body.title, video: videofn, img: imgfn, hd: true});
        } else {
            obj.data.push({name: req.body.title, video: videofn, img: imgfn});
        }


        let json = JSON.stringify(obj);

        fs.writeFileSync('./storage/data.json', json, 'utf8');

        next();

    },

    function (req, res) {
        res.render('upload', {
            flash: true,
            title: 'Upload',
            msgType: 'success',
            msg: 'Upload file successfully'
        });
    }
)
;

module.exports = router;
