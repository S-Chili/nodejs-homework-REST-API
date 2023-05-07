const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const updateContacts = async (req, res) => {
  const { id: contactId } = req.params;

  if (!req.body.email) {
    throw RequestError(400, "email is required");
  }
  
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateContacts;