const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
   privateKey: process.env.IMAGEKIT_KEY
});

async function uploadfile(file){
    const result = await client.files.upload({
        file,
        fileName:"music"+Date.now(),
        folder:"backend/music"
        
    })
    
    return result;
}


module.exports = {uploadfile};