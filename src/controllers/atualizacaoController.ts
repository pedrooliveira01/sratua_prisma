import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.get('/', async (req, res) => { 
  prisma.aTUALIZACAO.findMany({ where: { ATIVO:1 } })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));
})
