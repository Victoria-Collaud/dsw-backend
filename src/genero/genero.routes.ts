import{Router} from 'express';
import { findAll, findOne, add, update, remove, sanitizeGeneroInput} from './genero.controller.js';


export const generorouter = Router()
generorouter.get('/', findAll)
generorouter.get('/:CodGenero', findOne)
generorouter.post('/', sanitizeGeneroInput, add)
generorouter.put('/:CodGenero', sanitizeGeneroInput, update)
generorouter.patch('/:CodGenero', sanitizeGeneroInput, update)
generorouter.delete('/:CodGenero', remove)