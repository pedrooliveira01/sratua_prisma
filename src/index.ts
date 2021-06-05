import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
const basicAuth = require('express-basic-auth')
import { router } from './routes';
import cors from 'cors';

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

app.use(basicAuth({
    users: { 'admin': 'sratua68' },
    challenge: true, 
    unauthorizedResponse: getUnauthorizedResponse
}))


function getUnauthorizedResponse(req:any) {
  return req.auth
      ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
      : 'No credentials provided'
}

app.use('/', router)

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`,
  ),
)