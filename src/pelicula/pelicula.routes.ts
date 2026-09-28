/* 
get all
get por titulo
get por genero
*/

import{Router} from 'express';
import { sanitizePeliculaInput, findAll, BuscarPorTitulo, BuscarPorGenero, AgregarPelicula, BorrarPelicula } from './pelicula.controller.js';


export const peliculaRouter = Router()
peliculaRouter.get('/', findAll)
peliculaRouter.get('/:TituloPelicula', BuscarPorTitulo)
peliculaRouter.get('/:CodGenero', BuscarPorGenero)
peliculaRouter.post('/', sanitizePeliculaInput, AgregarPelicula)
peliculaRouter.delete('/:IdPelicula', BorrarPelicula)