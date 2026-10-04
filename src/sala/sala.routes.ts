import{Router} from 'express';
import { findAllSalas, findOneSala, AgregarSala, ActualizarSala, BorrarSala, sanitizeSalaInput} from './sala.controller.js';
import { autenticar, autorizar } from '../middlewares/auth.middleware.js';

export const salarouter = Router()
salarouter.get('/', autenticar, autorizar('ADMIN'), findAllSalas) //no NECESITA admin
salarouter.get('/:NumSala', autenticar, autorizar('ADMIN'), findOneSala) //no NECESITA admin
salarouter.post('/', sanitizeSalaInput, autenticar, autorizar('ADMIN'), AgregarSala)
salarouter.put('/:NumSala', sanitizeSalaInput, autenticar, autorizar('ADMIN'), ActualizarSala)
salarouter.patch('/:NumSala', sanitizeSalaInput, autenticar, autorizar('ADMIN'), ActualizarSala)
salarouter.delete('/:NumSala', autenticar, autorizar('ADMIN'), BorrarSala)