const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { id: contactId } = req.params;
  const result = await contacts.getById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;