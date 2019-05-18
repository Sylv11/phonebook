import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {createExpressApp} from './http/application'

const application = createExpressApp()

// Create a typeorm connection to the database and start express app
createConnection().then(() => {
    if(application.listening) application.close()

    application.listen(3003, () => {
        console.log('The server is running on port 3003')
    })
})