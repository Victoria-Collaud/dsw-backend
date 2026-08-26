import{Router} from 'express';
import {sanitizeSalaInput, findAll, findOne, add, update, remove} from './sala.controler.js';


export const salarouter = Router()
salarouter.get('/', findAll)
salarouter.get('/:NumSala', findOne)
salarouter.post('/', sanitizeSalaInput, add)
salarouter.put('/:NumSala', sanitizeSalaInput, update)
salarouter.patch('/:NumSala', sanitizeSalaInput, update)
salarouter.delete('/:NumSala', remove)