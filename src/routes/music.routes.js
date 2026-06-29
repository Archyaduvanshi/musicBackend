const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music.controllers');
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware');

const upload = multer({storage:multer.memoryStorage()});

router.post('/upload',authMiddleware.authartist,upload.single('music'),musicController.createMusic);

router.post('/album',authMiddleware.authartist,musicController.musicalbum);
router.get('/',authMiddleware.authuser,musicController.getallmusic);
router.get('/album',authMiddleware.authuser,musicController.getallalbum);
router.get('/album/:id',authMiddleware.authuser,musicController.getalbumbyid);

module.exports = router;