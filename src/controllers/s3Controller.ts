import { Router } from 'express';
import { PrismaClient,S3 } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

const resultEmpty : S3 = {
  DESCRICAO: '',
  ID_S3:-1
}

rotas.post('/find', async (req, res) => {
  const find = req.body;
  prisma.s3.findMany(find)
    .then(response => res.status(200).json(response.length > 0 ? response : resultEmpty) )
    .catch(error => res.status(200).json({result: false}));
})

rotas.get('/:id', async (req, res) => {
  const { id } = req.params
  prisma.s3.findUnique({ where: { ID_S3: Number(id) } })
    .then(response => res.status(200).json(response ? response : resultEmpty) )
    .catch(error => res.status(200).json({result: false}));  
})

rotas.post('/', async (req, res) => {
  const result = [];
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
         const {ID_S3, ...rest } = element;
         const response = await prisma.s3.create({
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
         const {ID_S3, ...rest } = element;
         await prisma.s3.update({
            where: {
              ID_S3: Number(ID_S3)
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
    const response = await prisma.s3.delete({ where: { ID_S3: Number(id) } })

    if (response){
      await prisma.s3_ITEM.deleteMany({ where: { ID_S3: response.ID_S3 } })    
    }

    res.status(200).json({ result: true})
  } catch (err) {
    res.status(200).json({ result: false})
  } 
})