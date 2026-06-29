const jwt = require("jsonwebtoken");

async function authartist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode.role !== "artist") {
            return res.status(401)
                .json({ message: "you don't access " });
        }

        req.user = decode;

       next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "unauthorized" });
    }
}

async function authuser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode.role !== "user") {
            return res.status(401)
                .json({ message: "you don't access " });
        }

        req.user = decode;

       next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "unauthorized" });
    }
}

module.exports ={authartist, authuser};