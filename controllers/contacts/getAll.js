const {Contact} = require('../../models/contacts')
const paginate = require('mongoose-paginate-v2')

const getAll = async (req, res) => {
  const {_id: owner} = req.user;
  
  const { page = 1, limit = 20, favorite } = req.query;
  
  const filter = {owner};
  if (favorite !== undefined) {
    filter.favorite = favorite === 'true';
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { favorite: -1 },
  };

  const result = await Contact.paginate(filter, options);

  res.json(result);
};

module.exports = getAll;