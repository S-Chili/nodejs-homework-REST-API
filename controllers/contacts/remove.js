const {Contact} = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const removeContacts = async (req, res) => {
  const { id: contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({
    message: "Contact deleted",
  });
};

module.exports = removeContacts;

