const Joi = require("joi");

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  if (req.method === "POST" && error) {
    res.status(400).json({ message: `missing required ${error.details[0].context.key} field` });
    return;
  }
  if (req.method === "PUT" && error) {
    res
      .status(400)
      .json({ message: `missing required ${error.details[0].context.key} field` });
    return;
  }
  if (req.method === "PUT" && error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  next();
};

module.exports = validateBody;