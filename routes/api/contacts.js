const express = require("express")

const router = express.Router();

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require("../../models/contacts");

const { schema } = require("../../utils/validation/schema");

router.get('/', async (req, res, next) => {
  try {
    const contacts = await getContacts();
    res.status(200).json({ contacts })
  } catch (error) {
    next(error);
  };
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({message:"Not found"})
    }
    res.status(200).json({contact})
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "validation error" });
    }
    const contact = await addContact(req.body);
    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  };
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (!contactById) {
    res.status(404).json({
      message:"Contact was`t found, please try again"
    })
  } else {
    await removeContact(contactId)
    res.status(200).json({
      message:"Success !!! Contact has been deleted"
    })
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error){
      res.status(400).json({message:"validation error"})
    };
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ result });
  } catch (error) {
    next(error)
  }
})

module.exports = router
