import{Router} from 'express';
import { sanitizePeliculaInput, findAllPeliculas, BuscarPorTitulo, BuscarPorGenero, AgregarPelicula, BorrarPelicula, ActualizarPelicula } from './pelicula.controller.js';
import { autenticar, autorizar } from '../middlewares/auth.middleware.js';

export const peliculaRouter = Router()
peliculaRouter.get('/', findAllPeliculas)
peliculaRouter.get('/buscar', BuscarPorTitulo)
peliculaRouter.get('/genero/:CodGenero', BuscarPorGenero)
peliculaRouter.post('/', sanitizePeliculaInput, autenticar, autorizar('ADMIN'), AgregarPelicula)
peliculaRouter.delete('/:IdPelicula', autenticar, autorizar('ADMIN'), BorrarPelicula)
peliculaRouter.put('/:IdPelicula', sanitizePeliculaInput, autenticar, autorizar('ADMIN'), ActualizarPelicula)
peliculaRouter.patch('/:IdPelicula', sanitizePeliculaInput, autenticar, autorizar('ADMIN'), ActualizarPelicula)