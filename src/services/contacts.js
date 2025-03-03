import mongoose from "mongoose";
import { ContactCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";

export const getAllContacts = async ({page=1, perPage=10, sortOrder = SORT_ORDER.ASC, sortBy = '_id'}) => {
    const limit = perPage
    const skip = (page - 1) * perPage

    const contactsQuery = ContactCollection.find()
    const countactCount = await ContactCollection.countDocuments().merge(contactsQuery).countDocuments()
    const contacts = await contactsQuery.skip(skip).limit(limit).exec()

    const paginationData = calculatePaginationData(countactCount, perPage, page)

    return {
        data : contacts, ...paginationData
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