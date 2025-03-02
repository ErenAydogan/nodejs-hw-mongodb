import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from "../services/contacts.js"
import createHttpError from "http-errors";


export const getContactsController = async (req, res) => { 
    const contacts = await getAllContacts()
    res.status(200).json(
        {
            status: 200,
            message: "Successfully found contacts!",
            data: contacts
        }
    )
}

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params
    const contact = await getContactById(contactId)

    if (!contact){
        res.status(404).json({
            message: 'Contact not found'
        })
        return
    }

    res.status(200).json(
        {
            status: 200,
            message: `Successfully found contact with id ${contactId}`,
            data: contact
        }
    )
}

export const createContactController = async (req, res) => {
    const {name, phoneNumber, contactType } = req.body
    if (!name || !phoneNumber || !contactType){
        res.status(400).json({
            message: 'Missing required fields: name, phoneNumber or contactType'
        })
        return
    }

    const contact = await createContact(req.body)
    res.status(201).json(
        {
            status: 201,
            message: 'Contact created successfully',
            data: contact
        }
    )
}

export const upsertContactController = async (req,res) => {
    const { contactId } = req.params
    const contact = await updateContact(contactId, req.body, {upsert: true})

    if (!contact){
        next(createHttpError(404, `Contact not found`))
        return
    }

    const status = contact.isNew ? 201 : 200

    res.status(status).json({
        status: status,
        message: `Successfully updated contact with id ${contactId}`,
        data: contact.contact
    })
}

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params

    const contact = await deleteContact(contactId)

    if (!contact){
        res.status(404).json({
            message: 'Contact not found'
        })
        return
    }

    res.status(204).send()
}