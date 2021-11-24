import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.post('/find', async (req, res) => {
  const find = req.body;
  prisma.pL_ITEM.findMany(find)
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));
})

rotas.get('/:id', async (req, res) => {
  const { id } = req.params
  prisma.pL_ITEM.findMany({ where: { ID_PL: Number(id) } })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));  
})

rotas.post('/', async (req, res) => {
  const result = [];
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
         const {ID_PL_ITEM, ...rest } = element;
         const response = await prisma.pL_ITEM.create({
            data: rest          
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
         const {ID_PL_ITEM, ...rest } = element;
         await prisma.pL_ITEM.update({
            where: {
              ID_PL_ITEM: Number(ID_PL_ITEM)
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


rotas.delete('/:id', async (req, res) => {
  const { id } = req.params
  prisma.pL_ITEM.delete({ where: { ID_PL_ITEM: Number(id) } })
    .then( response => res.status(200).json({ result: true}))
    .catch( err => res.status(200).json({ result: false}))
})


rotas.post('/upsert/', async (req, res) => {
  const result = [];
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      let idPLDeleted = 0;
      for (const [idx, element] of data.entries()) {
        if (idPLDeleted !== element.ID_PL) {
          idPLDeleted = element.ID_PL  
          await prisma.pL_ITEM.deleteMany({
            where:{
              ID_PL:element.ID_PL
            }
          })            
        }     

        const response = await prisma.pL_ITEM.create({
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