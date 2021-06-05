import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './index';

const prisma = new PrismaClient(prismaConfig)

export const rotas = Router();

rotas.post('/find', async (req, res) => {
  const find = req.body;
  prisma.cLIENTES.findMany(find)
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));
})

rotas.get('/:id', async (req, res) => {
  const { id } = req.params
  prisma.cLIENTES.findUnique({ where: { ID_CLIENTE: Number(id) } })
    .then(response => res.status(200).json(response) )
    .catch(error => res.status(200).json({result: false}));  
})

rotas.post('/', async (req, res) => {
  const result = [];
  const data = req.body;
 
  try {
    if ( Array.isArray(data) ) {
      for (const [idx, element] of data.entries()) {
        const {ID_CLIENTE, ...rest } = element;
        const response = await prisma.cLIENTES.create({
          data: rest          
        })
        result.push(response)
        
        await CreateClienteControle(response.ID_CLIENTE);
        await CreateClienteStatus(response.ID_CLIENTE);
      }  
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
        const {ID_CLIENTE, ...rest } = element;
        await prisma.cLIENTES.update({
            where: {
              ID_CLIENTE: Number(ID_CLIENTE)
            },
            data: rest          
        })     
      }

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
  const { id } = req.params;

  prisma.cLIENTES.delete({ where: { ID_CLIENTE: Number(id) } })
    .then(response => 
      prisma.cLIENTES_CONTROLE.delete({ where: { ID_CLIENTE: Number(response.ID_CLIENTE) } })
        .then(response => 
          prisma.cLIENTES_STATUS.delete({ where: { ID_CLIENTE: Number(id) } })
            .then(response =>  res.status(200).json({result: true})) 
            .catch(error => res.status(200).json({result: false}))
        )  
        .catch(error => res.status(200).json({result: false})
      )           
    )
    .catch(error => res.status(200).json({result: false}));  
      
})


async function CreateClienteControle(ID_CLIENTE:number){
  await prisma.cLIENTES_CONTROLE.create({
    data: {
      ID_CLIENTE: ID_CLIENTE,
      FECHAR: 0,
      REABRIR: 0,
      REINICIAR: 0,
      STATUS: 0 
    }          
  })         
}

async function CreateClienteStatus(ID_CLIENTE:number){
  await prisma.cLIENTES_STATUS.create({
    data: {
      ID_CLIENTE: ID_CLIENTE,
      PL_ARQ:'',
      PL_LAST_ID:0,
      PL_ORDEM:0,
      STATUS:0,
      PL_DATA: new Date()
    }          
  })                  
}