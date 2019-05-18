
/*
* Middleware that checks if the phonenumber is valid
* */

export const validatePhonenumber = (req, res, next) => {
    const {phonenumber} = req.body

    const phonenumberRegex = /^\+\s\d+\s\d+\s\d{6,}$/g

    if(!phonenumber.match(phonenumberRegex)) {
        return res.status(400).json({error: 'InvalidPhonenumber', message: 'Invalid phonenumber'})
    }

    next()
}