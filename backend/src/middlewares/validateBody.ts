import * as Joi from '@hapi/joi'

/*
* Middleware that checks if the Joi schema is respected
* */

export const validateBody = (schema) => (req, res, next) => {
    const result = Joi.validate(req.body, schema)

    if(result.error) {
        return res.status(400).json({error: 'BadRequest', message: result.error.message})
    }

    next()
}