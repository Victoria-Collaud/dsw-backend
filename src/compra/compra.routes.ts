import{Router} from 'express';
import { sanitizeCompraInput, CrearCompra,ListarCompras } from './compra.controller.js';
import { orm } from '../shared/db/orm.js';  


export const compraRouter = Router()
compraRouter.post('/', sanitizeCompraInput, async (req, res) => {
  const em = orm.em.fork()   // orm aislado por request para evitar problemas de concurrencia
  return CrearCompra(em, req, res)
})

compraRouter.get('/', async (req, res) => {
  const em = orm.em.fork()
  return ListarCompras(em, req, res)
})
