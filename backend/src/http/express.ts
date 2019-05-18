import {Server} from 'http'
import * as express from 'express'

/*
* Create server based on express
* */

export const app = express()
export const server = new Server(app)