import {app, server} from './express'
import {contactRouter} from "../routes/contact";
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

export const createExpressApp = () => {
    // Enable cors
    app.use(
        cors({
            origin: '*',
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: ['Authorization'],
        })
    )

// Accept JSON data
    app.use(bodyParser.json())

// Use contact router for /contacts route
    app.use('/contacts', contactRouter())

    return server
}