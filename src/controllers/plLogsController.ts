import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.post('/find', async (req, res) => {
  const find = req.body;
  prisma.pL_LOGS.findMany(find)
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));
})

rotas.get('/:id', async (req, res) => {
  const { id } = req.params
  prisma.pL_LOGS.findMany({ where: { ID_CLIENTE: Number(id) } })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));  
})

rotas.post('/', async (req, res) => {
  const result = [];
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
        const response = await prisma.pL_LOGS.create({
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

rotas.put('/', async (req, res) => {  
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
         const {ID_CLIENTE, ORDEM, ...rest } = element;
         await prisma.pL_LOGS.update({
            where: {
              ID_CLIENTE_ORDEM: {ID_CLIENTE: Number(ID_CLIENTE), ORDEM: Number(ORDEM)}
            },
            data: rest          
        })            
      };
      res.status(200).json({result: true})
    } else {
      res.status(200).json({result: false})
    }    
  } catch (err) {
    res.status(200).json({ result: false})
  }
})


rotas.delete('/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;
  prisma.pL_LOGS.deleteMany({ 
      where: {
        ID_CLIENTE: Number(id_cliente)
      }
    })
    .then( response => res.status(200).json({ result: true}))
    .catch( err => res.status(200).json({ result: false}))
})