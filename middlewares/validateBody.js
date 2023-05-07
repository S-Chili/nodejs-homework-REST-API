const Joi = require("joi");

const validateBody = (schema, method) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: `missing field` });
    return;
  } 
  if (error) {
    let errorMessage;
    if (method === 'POST') {
      errorMessage = { message: `missing required ${error.details[0].context.key} field` };
    } else if (method === 'PUT') {
      errorMessage = { message: `missing fields` };
    }
    res.status(400).json(errorMessage);
    return;
  }
  next();
};

module.exports = validateBody;