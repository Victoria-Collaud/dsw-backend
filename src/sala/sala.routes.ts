import{Router} from 'express';
import {sanitizeSalaInput, findAll, findOne, add, update, remove} from './sala.controler.js';


export const salarouter = Router()
salarouter.get('/', findAll)
salarouter.get('/:id', findOne)
salarouter.post('/', sanitizeSalaInput, add)
salarouter.put('/:id', sanitizeSalaInput, update)
salarouter.patch('/:id', sanitizeSalaInput, update)
salarouter.delete('/:id', remove)