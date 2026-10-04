import { Router } from 'express';
import { registrarUsuario, iniciarSesion, obtenerMiPerfil } from './usuario.controller.js';
//nada necesita admin

export const usuarioRouter = Router()

usuarioRouter.post('/registro', registrarUsuario)
usuarioRouter.post('/login', iniciarSesion)
usuarioRouter.get('/:IdUsuario', obtenerMiPerfil)