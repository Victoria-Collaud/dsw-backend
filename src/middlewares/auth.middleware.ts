import  { NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { idUsuario: number; rol: string };
}

function autenticar(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  // Verifica que el header existe y tiene el formato correcto
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }
  const token = authHeader.split(' ')[1]; // Extrae el token puro [citation:1]
  try {
    // Verifica el token con el secreto y decodifica el payload
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { idUsuario: number; rol: string };
    // Inyecta el usuario en la request para que el siguiente middleware lo use
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' }); // 403: credenciales inválidas [citation:1]
  }
}

function autorizar(...rolesPermitidos: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Verificar que el usuario esté autenticado
    if (!req.user) {
      return res.status(401).json({ mensaje: 'No autenticado' });
    }
    // Verificar que el rol del usuario esté dentro de los permitidos
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ mensaje: 'No tienes permiso para esta acción' });
    }
    next();
  };
}

export { autenticar, autorizar};