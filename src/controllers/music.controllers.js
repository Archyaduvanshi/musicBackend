const musicModel = require("../models/music.models");
const jwt = require("jsonwebtoken");
const { uploadfile } = require("../services/storage.services");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
 
        const { title } = req.body;
        const file = req.file;

        const result = await uploadfile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id,
        });

        res.status(201).json({
            message: "music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            },
        });

}

async function musicalbum(req, res) {
   
        const { title, musics } = req.body;
        const album = await albumModel.create({
            title,
            artist:req.user.id,
            music:musics
        })

        res.status(201).json({
            message: "music album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics:album.music
            },
        }); 
}


async function getallmusic(req,res){
    const musics = await musicModel.find();
    res.status(200).json({
        message: "fetch all music successfully",
        musics
    })
}

async function getallalbum(req,res){
    const albums = await albumModel.find().select("title artist").populate("artist"," username");
    res.status(200).json({
        message: "fetch all album successfully",
        albums
    })
}

async function getalbumbyid(req,res){
    const album = await albumModel.findById(req.params.id).populate("artist"," username");
    res.status(200).json({
        message: "fetch album successfully",
        album
    })
}


module.exports = { createMusic, musicalbum, getallmusic,getallalbum, getalbumbyid };
