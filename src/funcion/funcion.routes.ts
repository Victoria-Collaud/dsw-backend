import{ Router } from 'express'
import { sanitizeFuncionInput, FuncionesdeunaPelicula, AgregarFuncion, BorrarFuncion } from './funcion.controller.js'
import { autenticar, autorizar } from '../middlewares/auth.middleware.js';

export const funcionRouter = Router()
funcionRouter.get('/peliculas/:IdPelicula', FuncionesdeunaPelicula)
funcionRouter.post('/', autenticar, autorizar('ADMIN'), sanitizeFuncionInput, AgregarFuncion)
funcionRouter.delete('/:IdFuncion', autenticar, autorizar('ADMIN'), BorrarFuncion)
