const fs = require("fs/promises")
const path = require("path")
const jimp = require("jimp")

const {User} = require("../../models/user")

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async(req, res)=> {
    
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    const {_id} = req.user;
    const {path: tmpUpload, originalname} = req.file;
    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, filename);
    
    const image = await jimp.read(tmpUpload);
    image.cover(250, 250).write(resultUpload);
    jimp.cache = {};

    await fs.unlink(tmpUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.status(200).json({
        avatarURL,
    });
}

module.exports = updateAvatar;