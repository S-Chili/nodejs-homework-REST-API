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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
}, {versionKey: false, timestamps: true})

contactsSchema.post("save", handleSaveErrors)

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'missing required email field',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field',
  }),
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
