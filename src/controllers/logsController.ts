import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.post('/find', async (req, res) => {
  const find = req.body;
  prisma.lOGS.findMany(find)
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));
})

rotas.get('/:id', async (req, res) => {
  const { id } = req.params
  prisma.lOGS.findMany({ where: { ID_CLIENTE: Number(id) } })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));  
})

rotas.post('/', async (req, res) => {
  const result = [];
  const data = req.body;
 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
        const response = await prisma.lOGS.create({
            data: element          
        })       
        result.push(response)     
      };
      res.status(200).json(result)
    } else {
      res.status(200).json({result: false})
    }    

  } catch (err) {
    res.status(200).json({ result: false})
  } 
})

rotas.delete('/:id', async (req, res) => {
  const { id } = req.params
  prisma.lOGS.deleteMany({ where: { ID_CLIENTE: Number(id) } })
    .then( response => res.status(200).json({ result: true}))
    .catch( err => res.status(200).json({ result: false}))
})