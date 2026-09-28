/* 
registro
inicio de sesion   En el controlador de registro y login, deberás usar una librería como bcrypt o argon2 para hashear y comparar contraseñas. Rutas como "Ver Perfil" o "Editar Perfil" deben estar protegidas. Necesitarás un Middleware (ej. JWT, Sesiones) que verifique que el usuario está logueado antes de dejarle pasar.
perfil
administración ???????
*/

import { Request, Response } from 'express'; 
import { RolUsuario, Usuario } from './usuario.entity.js';
import { orm } from '../shared/db/orm.js';
// bcrypt@6 does not include TypeScript declarations in this project.
// @ts-expect-error The package is used at runtime and exposes hash/compare.
import bcrypt from 'bcrypt'; //Migrar a Authprovider en frontend

const em = orm.em

function sanitizeUsuarioInput(req: Request, res: Response, next:Function) { 
    req.body.sanitizedInput = {
        IdUsuario: req.body.IdUsuario,
        FechaNacimiento: req.body.FechaNacimiento,
        EmailUsuario: req.body.EmailUsuario,
        ContrasenaHash: req.body.ContrasenaHash,
        rol: req.body.rol
        }

    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
      }
    })
next ()
} 

async function registrarUsuario(req: Request, res: Response) {
    try {
      const { EmailUsuario, ContrasenaHash: contrasena, FechaNacimiento } = req.body

      // 1. Verificar email duplicado
       const existe = await em.findOne(Usuario, { EmailUsuario: EmailUsuario })
    if (existe) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }
      // 2. Hashear contraseña
      const hash = await bcrypt.hash(contrasena, 10)
      // 3. Crear entidad
      const nuevoUsuario = new Usuario(
        0,
        new Date(FechaNacimiento),
        EmailUsuario,
        hash,
        RolUsuario.CLIENTE
      );
         // 4. Guardar en BD
     em.persist(nuevoUsuario)
     await em.flush()

      // 5. Devolver respuesta
      const { ContrasenaHash, ...usuarioSeguro } = nuevoUsuario
    return res.status(201).json(usuarioSeguro)

    } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
  }


    async function iniciarSesion(req: Request, res: Response) {
    try {
      const { email, contrasena } = req.body;
      
      const usuario = await em.findOne(Usuario, { EmailUsuario: email });
      if (!usuario) return res.status(401).json({ message: 'Credenciales inválidas' });

      const esValida = await bcrypt.compare(contrasena, usuario.ContrasenaHash);
      if (!esValida) return res.status(401).json({ message: 'Credenciales inválidas' });

      // ... generar token
      return res.status(200).json({ usuario, token: '...' });
    } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
  }


    async function obtenerMiPerfil(req: Request, res: Response) {
    try {
    // Extraemos el ID de los parámetros de la URL
    const idUsuario = Number(req.params.IdUsuario);

    // Validación si el id es numero
    if (isNaN(idUsuario)) {
      return res.status(400).json({ mensaje: 'ID de usuario inválido' });
    }
    // Buscar usuario
    const usuario = await em.findOne(Usuario, { IdUsuario: idUsuario });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Ocultar el hash antes de devolver
    const { ContrasenaHash, ...usuarioSeguro } = usuario;
    return res.status(200).json(usuarioSeguro);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export { registrarUsuario, iniciarSesion, obtenerMiPerfil, sanitizeUsuarioInput }