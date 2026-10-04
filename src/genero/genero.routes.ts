import{Router} from 'express';
import { sanitizeGeneroInput, findAllGeneros, findOneGenero, AgregarGenero, ActualizarGenero, BorrarGenero, } from './genero.controller.js';
import { autenticar, autorizar } from '../middlewares/auth.middleware.js';

export const generorouter = Router()
generorouter.get('/', findAllGeneros)
generorouter.get('/:CodGenero', findOneGenero)
generorouter.post('/', sanitizeGeneroInput, autenticar, autorizar('ADMIN'), AgregarGenero)
generorouter.put('/:CodGenero', sanitizeGeneroInput, autenticar, autorizar('ADMIN'), ActualizarGenero)
generorouter.patch('/:CodGenero', sanitizeGeneroInput, autenticar, autorizar('ADMIN'), ActualizarGenero)
generorouter.delete('/:CodGenero', autenticar, autorizar('ADMIN'), BorrarGenero)