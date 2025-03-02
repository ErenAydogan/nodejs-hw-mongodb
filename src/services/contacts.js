import mongoose from "mongoose";
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
        if (!mongoose.Types.ObjectId.isValid(contactId)){
            return null
        }
        const contact = await ContactCollection.findById(contactId)
        return contact
    }
    catch (error) {
        console.log(error)
    }
}

export const createContact = async (payload) => {
    try {
        const contact = await ContactCollection.create(payload)
        return contact
    }
    catch (error) {
        console.log(error)
    }
}

export const updateContact =  async (contactId, payload, option = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(
        {_id: contactId},
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...option,
        }
    )

    if (!rawResult || !rawResult.value) return null

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted)
    }
}

export const deleteContact = async (contactId) => {
    const contact = await ContactCollection.findOneAndDelete({_id: contactId})
    return contact
}