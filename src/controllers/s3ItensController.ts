import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.post('/find', async (req, res) => {
  const find = req.body;
  prisma.s3_ITEM.findMany(find)
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));
})

rotas.get('/:id', async (req, res) => {
  const { id } = req.params
  prisma.s3_ITEM.findMany({ where: { ID_S3: Number(id) } })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false})); 
})

rotas.post('/', async (req, res) => {
  const result = [];
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
         const {ID_S3_ITEM, ...rest } = element;
         const response = await prisma.s3_ITEM.create({
            data: rest          
        })   
        result.push(response)         
      };
      res.status(200).json(result)
    } else {
      res.status(200).json({result: false})
    }    

  } catch (err) {
    console.log(err.message)
    res.status(200).json({ result: false})
  } 
})

rotas.put('/', async (req, res) => {  
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
         const {ID_S3_ITEM, ...rest } = element;
         await prisma.s3_ITEM.update({
            where: {
              ID_S3_ITEM: Number(ID_S3_ITEM)
            },
            data: rest          
        })            
      };
      res.status(200).json({result: true})
    } else {
      res.status(200).json({result: false})
    }    

  } catch (err) {
    console.log(err.message)
    res.status(200).json({ result: false})
  } 
})


rotas.delete('/:id', async (req, res) => {
  const { id } = req.params
  prisma.s3_ITEM.delete({ where: { ID_S3_ITEM: Number(id) } })
    .then( response => res.status(200).json({ result: true}))
    .catch( err => res.status(200).json({ result: false}))
})