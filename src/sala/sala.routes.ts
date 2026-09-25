import{Router} from 'express';
import { findAll, findOne, add, update, remove, sanitizeSalaInput} from './sala.controler.js';


export const salarouter = Router()
salarouter.get('/', findAll)
salarouter.get('/:numSala', findOne)
salarouter.post('/', sanitizeSalaInput, add)
salarouter.put('/:id', sanitizeSalaInput, update)
salarouter.patch('/:id', sanitizeSalaInput, update)
salarouter.delete('/:id', remove)