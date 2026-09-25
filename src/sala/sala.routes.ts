import{Router} from 'express';
import { findAll, findOne, add, update, remove, sanitizeSalaInput} from './sala.controller.js';


export const salarouter = Router()
salarouter.get('/', findAll)
salarouter.get('/:NumSala', findOne)
salarouter.post('/', sanitizeSalaInput, add)
salarouter.put('/:NumSala', sanitizeSalaInput, update)
salarouter.patch('/:NumSala', sanitizeSalaInput, update)
salarouter.delete('/:NumSala', remove)