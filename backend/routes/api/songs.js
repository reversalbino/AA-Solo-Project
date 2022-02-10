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
    check('file').exists({ checkFalsy: true }).isLength({ min: 4 }).withMessage(
        'Please provide a file.'
    ),
    handleValidationErrors
];

router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { name, file } = req.body;
    const song = await Song.upload({
        name,
        file
    });

    return song;
}));

router.all((req, res, next) => {
    console.log("PLEASE");
    next();
});

router.get('/:id', asyncHandler( async(req, res) => {
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