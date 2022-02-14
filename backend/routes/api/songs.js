
require('dotenv').config();
const cloudinary = require('cloudinary').v2;const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Song } = require('../../db/models');
const song = require('../../db/models/song');

const router = express.Router();



cloudinary.config({
    CLOUDINARY_URL: process.env.CLOUDINARY_URL
})

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
    const { name, url, public_id, picture_url, userId } = req.body;

    console.log('=============SONG INFO=================', userId);
    // const song = await Song.upload({
    //     name,
    //     file,
    // });
    try {
        const song = await Song.create({
            name, 
            url,
            public_id,
            picture_url,
            userId
        });
        return res.json({
            created: true
        })
    } catch(e) {
        return res.json({
            created: false
        })
    }
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
        },
        include: 'User'
    });

    //console.log('SONGS FOUND', songs);

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

router.delete('/delete/:id', asyncHandler(async(req, res) => {
    const id = req.params.id;

    let songToDelete = await Song.findByPk(id);
    let songPublicId = songToDelete.public_id;

    console.log('PUBLIC_ID', songPublicId);

    console.log('found the song and going to delete it');

    await cloudinary.uploader.destroy(songPublicId, { resource_type: 'video' }, function(error, result) {
        console.log(error, result);

        if(error === undefined) {
            return res.json({
                'deleted': true
            })
        }
    });

    await songToDelete.destroy();

    return res.json ({
        'deleted': false
    });
}));

module.exports = router;