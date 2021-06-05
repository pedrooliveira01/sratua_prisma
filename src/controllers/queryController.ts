import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.post('/', async (req, res) => { 
  const { query } = req.body;
  prisma.$queryRaw(query)
    .then(response => res.status(200).json(response) )
    .catch(error => {
        console.log(error.message)
        res.status(200).json({result: false})
    });
})
