import Joi from 'joi'

export const createContactSchema = Joi.object(
    {
        name: Joi.string().min(3).max(20).required().messages({
            'string.base': 'Name must be a string',
            'string.min': 'Name must have at least {#limit} characters',
            'string.max': 'Name must have at most {#limit} characters',
            'any.required': 'Name is required'
        }),
        phoneNumber: Joi.string().min(3).max(20).required().messages({
            'string.base': 'Phone number must be a string',
            'string.min': 'Phone number must have at least {#limit} characters',
            'string.max': 'Phone number must have at most {#limit} characters',
            'any.required': 'Phone number is required'
        }),
        email: Joi.string().min(3).max(20).messages({
            'string.base': 'Email must be a string',
            'string.min': 'Email must have at least {#limit} characters',
            'string.max': 'Email must have at most {#limit} characters',
        }),
        isFavorite: Joi.boolean(),
        contactType: Joi.string().valid('work', 'home', 'personal').default('personal')
    }
)

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must have at least {#limit} characters',
        'string.max': 'Name must have at most {#limit} characters',
    }),
    phoneNumber: Joi.string().min(3).max(20).messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must have at least {#limit} characters',
        'string.max': 'Name must have at most {#limit} characters',
    }),
    email: Joi.string().min(3).max(20).messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must have at least {#limit} characters',
        'string.max': 'Name must have at most {#limit} characters',
    }),
    isFavorite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal')
})