const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
      throw createError(404);
    }
    res.json({ message: "Contact has been deleted" });
    }
    catch (error) {
      next(error);
    }
};

module.exports = removeById;
