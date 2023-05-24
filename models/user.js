const {Schema, model} = require("mongoose")
const Joi = require("joi")

const {handleSaveErrors} = require("../helpers")
const allowedSubscription = ["starter", "pro", "business"]
const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: allowedSubscription,
      default: "starter"
    },
    token: { 
      type: String, 
      default: "" 
    },
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleSaveErrors)

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...allowedSubscription).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
}

const User = model("user", userSchema)

module.exports = {
    User,
    schemas,
}