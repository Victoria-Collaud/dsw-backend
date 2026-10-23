import{ Router } from 'express'
import { sanitizeFuncionInput, FuncionesdeunaPelicula, AgregarFuncion, BorrarFuncion, ActualizarFuncion, ObtenerFuncionPorId } from './funcion.controller.js'
import { autenticar, autorizar } from '../middlewares/auth.middleware.js';

export const funcionRouter = Router()
funcionRouter.get('/peliculas/:IdPelicula', FuncionesdeunaPelicula)
funcionRouter.get('/:IdFuncion', ObtenerFuncionPorId)
funcionRouter.post('/', autenticar, autorizar('ADMIN'), sanitizeFuncionInput, AgregarFuncion)
funcionRouter.delete('/:IdFuncion', autenticar, autorizar('ADMIN'), BorrarFuncion)
funcionRouter.put('/:IdFuncion', autenticar, autorizar('ADMIN'), sanitizeFuncionInput, ActualizarFuncion)
funcionRouter.patch('/:IdFuncion', autenticar, autorizar('ADMIN'), sanitizeFuncionInput, ActualizarFuncion)