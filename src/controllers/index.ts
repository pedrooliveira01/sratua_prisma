export { rotas as atualizacaoController } from './atualizacaoController';
export { rotas as clientesControleController } from './clientesControleController';
export { rotas as clientesController } from './clientesController';
export { rotas as clientesPLController } from './clientesPLController';
export { rotas as clientesStatusController } from './clientesStatusController';
export { rotas as geradorController } from './geradorController';
export { rotas as logsController } from './logsController';
export { rotas as parametrosS3Controller } from './parametrosS3Controller';
export { rotas as plController } from './plController';
export { rotas as plItensController } from './plItensController';
export { rotas as plLogsController } from './plLogsController';
export { rotas as s3Controller } from './s3Controller';
export { rotas as s3ItensController } from './s3ItensController';
export { rotas as queryController } from './queryController';

import { Prisma } from '@prisma/client'

export const prismaConfig: Prisma.PrismaClientOptions = {
  log: ['query', `error`] }
  
  /* 
  errorFormat: 'minimal',
  log: [
    { emit: 'stdout', level: 'query' },
    { emit: 'stdout', level: 'error' }
  ]
}*/