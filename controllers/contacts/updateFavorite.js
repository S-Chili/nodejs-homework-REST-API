const { Contact } = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id: contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateFavorite;