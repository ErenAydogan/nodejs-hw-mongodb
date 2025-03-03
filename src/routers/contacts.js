import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController, upsertContactController, deleteContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js"
import { isValidId } from "../middlewares/isValidId.js"

const router = Router()

router.get('/contacts', ctrlWrapper(getContactsController))
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController))
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController))
router.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(upsertContactController))
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController))

export default router