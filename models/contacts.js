const {Schema, model} = require('mongoose')
const Joi = require('joi')

const {handleSaveErrors} = require("../helpers")

const contactsSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, {versionKey: false, timestamps: true})

contactsSchema.post("save", handleSaveErrors)

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
  }),
});


const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model('Contact', contactsSchema)

module.exports = { 
  schemas,
  Contact
};
