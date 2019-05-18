import * as request from 'supertest'
import {createExpressApp} from '../../src/http/application'
import {createConnection} from 'typeorm'

describe('Actions on contacts', () => {

    it('get all contacts', async () => {
        const requester = request(createExpressApp())
        await createConnection()

       const {body: createdContact} = await requester
            .post('/contacts')
            .send({
                'firstname': 'John',
                'lastname': 'Doe',
                'phonenumber': '+ 32 472 706280'
            })
            .expect(201)

        await requester
            .get('/contacts')
            .expect(200)
            .expect(({body}) => {
                expect(body.length !== 0)
            })

        await requester
            .delete(`/contacts/${createdContact.id}`)
            .expect(200)
    })

    it('creates a contact if the data are correct', async () => {
        const requester = request(createExpressApp())

        const lengthBeforeData = await requester
            .get('/contacts')
            .expect(200)

        const lengthBefore = lengthBeforeData.body.length

        const {body: createdContact } = await requester
            .post('/contacts')
            .send({
                'firstname': 'John',
                'lastname': 'Doe',
                'phonenumber': '+ 32 472 706280'
            })
            .expect(201)

        await requester
            .get('/contacts')
            .expect(200)
            .expect(({body}) => {
                expect(body.length).toBe(lengthBefore + 1)
            })

        await requester
            .delete(`/contacts/${createdContact.id}`)
            .expect(200)
    })

    it('deletes a contact', async () => {
        const requester = request(createExpressApp())

        const {body: createdContact } = await requester
            .post('/contacts')
            .send({
                'firstname': 'John',
                'lastname': 'Doe',
                'phonenumber': '+ 32 472 706280'
            })
            .expect(201)

        await requester
            .delete(`/contacts/${createdContact.id}`)
            .expect(200)
    })

    it('updates a contact', async () => {
        const requester = request(createExpressApp())

        const {body: createdContact } = await requester
            .post('/contacts')
            .send({
                'firstname': 'John',
                'lastname': 'Doe',
                'phonenumber': '+ 32 472 706280'
            })
            .expect(201)

        const updatedContact = {
            'firstname': 'JohnUpdated',
            'lastname': 'DoeUpdated',
            'phonenumber': '+ 32 472 706280',
        }

        await requester
            .patch(`/contacts/${createdContact.id}`)
            .send(updatedContact)
            .expect(200)

        await requester
            .delete(`/contacts/${createdContact.id}`)
            .expect(200)
    })
})