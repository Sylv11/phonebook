import * as Joi from '@hapi/joi'

/*
* Joi schema that checks if the data are correct
* */

export const contactSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phonenumber: Joi.string().required(),
})
