import{ Router } from 'express'
import { sanitizeFuncionInput, FuncionesdeunaPelicula, AgregarFuncion, BorrarFuncion } from './funcion.controller.js'

export const funcionRouter = Router()
funcionRouter.get('/peliculas/:IdPelicula', FuncionesdeunaPelicula)
funcionRouter.post('/', sanitizeFuncionInput, AgregarFuncion)
funcionRouter.delete('/:IdFuncion', BorrarFuncion)
