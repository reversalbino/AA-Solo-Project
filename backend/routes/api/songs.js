const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Song } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('name').exists({ checkFalsy: true }).withMessage(
        'Please provide a song name.'
    ),
    check('url').exists({ checkFalsy: true }).isLength({ min: 4 }).withMessage(
        'Please provide a url.'
    ),
    handleValidationErrors
];

router.post('/', asyncHandler(async (req, res) => {
    const { name, url, userId } = req.body;

    console.log('=============SONG INFO=================', userId);
    // const song = await Song.upload({
    //     name,
    //     file,
    // });
    const song = await Song.create({
        name, 
        url,
        userId
    });

    return song;
}));

router.all((req, res, next) => {
    console.log("PLEASE");
    next();
});

router.get('/user/:id', asyncHandler(async(req, res) => {
    let userId = req.params.id;

    console.log('===========db user id==============', userId);

    let songs = await Song.findAll({
        where: {
            userId
        }
    });

    console.log('SONGS FOUND', songs);

    return res.json({
        songs
    });
}));

router.get('/:id', asyncHandler(async(req, res) => {
    console.log('REQ PARAMS ID: ', req.params.id);
    let song = null;
    try {
        console.log('LOOKING');
        song = await Song.find({
            id: 1
        });
        
    } catch(e) {
        console.log('COULD NOT CALL FIND FUNCTION');
    }

    console.log('===============SONG===============', song.file, 'SENDING SONG');

    //await setTokenCookie(res, song);

    return res.json({
        song
    });
}));

module.exports = router;