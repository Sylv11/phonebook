import {Contact} from '../entity/Contact'
import {getRepository} from 'typeorm'

/*
* contactController
* This class manages the contacts
* */

export const contactController = {
    // Get all contacts
    getAll: async (req, res) => {
        const repository = getRepository(Contact)

        const contacts = await repository.find()

        res.json(contacts)
    },

    // Create a contact
    create: async (req, res) => {
        const repository = getRepository(Contact)

        const contact = repository.create(req.body)

        const storedContact = await repository.save(contact)

        res.status(201).json(storedContact)

    },

    // Update a contact
    update: async (req, res) => {
        const repository = getRepository(Contact)

        const contactId = req.params.id

        const updatedContact = await repository.update(contactId, req.body)

       res.json(updatedContact)
    },

    delete: async (req, res) => {
        const repository = getRepository(Contact)

        const contactId = req.params.id

        const deletedContact = await repository.delete(contactId)

        res.json(deletedContact)
    }
}