require("dotenv-safe").config();

import express, { Request, Response, NextFunction } from 'express';

import {
  atualizacaoController,
  clientesController,
  clientesControleController,
  clientesPLController,
  clientesStatusController,
  geradorController,
  logsController,
  parametrosS3Controller,
  plController,
  plItensController,
  plLogsController,
  s3Controller,
  s3ItensController,
  queryController
  
} from '../controllers';

export const router = express.Router();

router.get('/ping', async (req, res) => {
  res.status(200).json({result:'pong'}) 
})

router.get('/datahora', async (req, res) => {
  const datahora = new Date();
  const str = await datahora.toLocaleString('pt-BR',{
    timeZone: 'America/Sao_Paulo'
  } );
  res.status(500).json({result:str}) 
})

router.use('/atualizacoes', atualizacaoController);
router.use('/clientes', clientesController);
router.use('/clientecontroles', clientesControleController);
router.use('/clientepls', clientesPLController);
router.use('/clientestatus', clientesStatusController);
router.use('/geradores', geradorController);
router.use('/logs', logsController);
router.use('/parametross3', parametrosS3Controller);
router.use('/pls', plController);
router.use('/plitens', plItensController);
router.use('/pllogs', plLogsController);
router.use('/s3', s3Controller);
router.use('/s3itens', s3ItensController);
router.use('/query', queryController);