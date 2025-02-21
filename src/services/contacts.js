import { ContactCollection } from "../db/models/contact.js";

export const getAllContacts = async () => {
    try {
        const contacts = await ContactCollection.find()
        return contacts
    }
    catch (error) {
        console.log(error)
    }
}

export const getContactById = async (contactId) => {
    try {
        const contact = await ContactCollection.findById(contactId)
        return contact
    }
    catch (error) {
        console.log(error)
    }
}