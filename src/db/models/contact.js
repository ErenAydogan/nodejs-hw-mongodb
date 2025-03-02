import { Schema, model} from 'mongoose';

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: false,
        },
        isFavorite: {
            type: Boolean,
            default: false
        },
        contactType: {
            type: String,
            required: true,
            enum: ['work', 'home', 'personal'],
            default: "personal",
        }
    },
    {
        timestamps: true,
        strict: true
    }
)

export const ContactCollection = model('contact', contactSchema)