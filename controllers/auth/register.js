const bcrypt = require("bcryptjs")

const gravatar = require("gravatar")

const {User} = require('../../models/user')

const {RequestError, sendEmail} = require('../../helpers');

let nanoid;
import("nanoid").then((module) => {
  nanoid = module.nanoid;
});

const {BASE_URL} = process.env;

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
   
    if(user) {
        throw RequestError(409, 'Email in use')
    };

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email)
    const verificationToken = nanoid();
    const result = await User.create({email, password: hashPassword, avatarURL, verificationToken});
    
    const mail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify you email</a>`
    }

    await sendEmail(mail);
    
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
        }
    })
}

module.exports = register;
