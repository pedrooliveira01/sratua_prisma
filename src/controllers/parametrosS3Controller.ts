import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.get('/:nome', async (req, res) => {
  const { nome } = req.params

  prisma.pARAMETROS_S3.findFirst(
      { where: {
        AND:{
          ATIVO:1, 
          NOME:nome
        }  
      } 
    })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));  
})

rotas.get('/', async (req, res) => {

  prisma.pARAMETROS_S3.findFirst(
      { where: {
        AND:{
          ATIVO:1
        }  
      } 
    })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));  
})
