import expressPromiseRouter from 'express-promise-router'
import {contactController} from '../controller/contactController'
import {validatePhonenumber} from "../middlewares/validatePhonenumber";
import {validateBody} from "../middlewares/validateBody";
import {contactSchema} from "../schemas/contact";

/**
 * contact sub router
 */


export const contactRouter = () => {
    const router = expressPromiseRouter()

    router.get('/', contactController.getAll)
    router.post('/', validateBody(contactSchema), validatePhonenumber,  contactController.create)
    router.patch('/:id', validateBody(contactSchema), validatePhonenumber, contactController.update)
    router.delete('/:id', contactController.delete)

    return router
}