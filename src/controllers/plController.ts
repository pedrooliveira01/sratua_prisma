import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.post('/find', async (req, res) => {
  const find = req.body;
  prisma.pL.findMany(find)
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));
})

rotas.get('/:id', async (req, res) => {
  const { id } = req.params
  prisma.pL.findUnique({ where: { ID_PL: Number(id) } })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));  
})

rotas.post('/', async (req, res) => {
  const result = [];
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
         const {ID_PL, ...rest } = element;
         const response = await prisma.pL.create({
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
         const {ID_PL, ...rest } = element;
         await prisma.pL.update({
            where: {
              ID_PL: Number(ID_PL)
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
  try {
    const response = await prisma.pL.delete({ where: { ID_PL: Number(id) } })

    if (response){
      await prisma.pL_ITEM.deleteMany({ where: { ID_PL: response.ID_PL } })    
    }

    res.status(200).json({ result: true})
  } catch (err) {
    res.status(200).json({ result: false})
  } 
})


rotas.post('/upsert/', async (req, res) => {
  const result = [];
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
         const {ID_PL, ...rest } = element;

         const response = await prisma.pL.upsert({
          where: {
            ID_PL: ID_PL,
          },
          update: rest,
          create: element,
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
