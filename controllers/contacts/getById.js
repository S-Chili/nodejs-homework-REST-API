const { Contact } = require("../../models/contacts");

const getById = async (req, res) => {
  const { id: contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

module.exports = getById;