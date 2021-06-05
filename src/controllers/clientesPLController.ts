import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.post('/find', async (req, res) => {
  const find = req.body;
  prisma.cLIENTES_PL.findMany(find)
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));
})

rotas.get('/:id', async (req, res) => {
  const { id } = req.params
  prisma.cLIENTES_PL.findMany({ where: { ID_CLIENTE: Number(id) } })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));  
})

rotas.post('/', async (req, res) => {
  const result = [];
  const data = req.body; 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
        const response = await prisma.cLIENTES_PL.create({
            data: element          
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
         const {ID_PL, ID_CLIENTE, DIA_SEMANA, ...rest } = element;
         await prisma.cLIENTES_PL.update({
            where: {
              ID_PL_ID_CLIENTE_DIA_SEMANA: {ID_CLIENTE: Number(ID_CLIENTE), ID_PL: Number(ID_PL), DIA_SEMANA: Number(DIA_SEMANA) }
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


rotas.delete('/:id_cliente/:id_pl/:dia_semana', async (req, res) => {
const { id_cliente, id_pl, dia_semana } = req.params;

  prisma.cLIENTES_PL.delete({ 
    where: {
      ID_PL_ID_CLIENTE_DIA_SEMANA: {ID_CLIENTE: Number(id_cliente), ID_PL: Number(id_pl), DIA_SEMANA: Number(dia_semana) }
    }
  })
    .then( response => res.status(200).json({ result: true}))
    .catch( err => res.status(200).json({ result: false}))
})