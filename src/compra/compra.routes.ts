import{Router} from 'express';
import { sanitizeCompraInput, CrearCompra } from './compra.controller.js';


export const compraRouter = Router()
compraRouter.get('/', sanitizeCompraInput, CrearCompra)