import  { NextFunction, Request, Response} from "express";
import { orm } from "../shared/db/orm.js"
import { Compra } from "./compra.entity.js"
import { Funcion } from "../funcion/funcion.entity.js"
import { EntityManager, LockMode } from "@mikro-orm/core";
import { Usuario } from "../usuario/usuario.entity.js";
import { randomUUID } from "crypto"; //temporal
import Qrcode from "qrcode";
import { AuthRequest } from '../middlewares/auth.middleware.js';

const em = orm.em // entity manager

function sanitizeCompraInput(req: Request, res: Response, next: NextFunction) { 
    req.body.sanitizedInput = {
        MetodoPago: req.body.MetodoPago,
        CantEntradas: req.body.CantEntradas,
        Precio: req.body.Precio, //hace falta?
        IdUsuario: req.body.IdUsuario,
        IdFuncion: req.body.IdFuncion
       }

    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
      }
    })
next ()
}

async function CrearCompra(em: EntityManager, req: Request, res: Response) {
  try {
        
    const { IdUsuario, IdFuncion, CantEntradas, MetodoPago } = req.body.sanitizedInput
    
    
    const nuevaCompra = await em.transactional(async (em) => {
      // 1. Buscar la función CON BLOQUEO PESIMISTA
      const funcion = await em.findOne(
        Funcion,
        { IdFuncion },
        {
          populate: ['sala'],
          lockMode: LockMode.PESSIMISTIC_WRITE
        }
      )
      if (!funcion) {
        throw new Error('La función no existe')
      }

    // Verificar capacidad
    if (funcion.CapacidadDisponible < CantEntradas) {
      throw new Error(`Solo quedan ${funcion.CapacidadDisponible} asientos disponibles`)
    }
    // Validar el límite de entradas
    if (!CantEntradas || CantEntradas < 1) {
      return res.status(400).json({ mensaje: 'Debes seleccionar al menos 1 entrada.' });
    }
    if (CantEntradas > 5) {
      return res.status(400).json({ mensaje: 'Solo puedes comprar un máximo de 5 entradas por transacción.' });
    }

    // Busca el usuario
    const usuario = await em.findOne(Usuario, { IdUsuario: IdUsuario })
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }

    //calcula PRECIO HEREDADO DE SALA
    const precioUnitario = Number(funcion.sala.PrecioSala)
    const precioTotal = precioUnitario * CantEntradas

    //genera QR para cada entrada
    const qrs = await Promise.all(
  Array.from({ length: CantEntradas }, async () => {
    const codigoUnico = randomUUID();
    // Generamos el QR como Data URL (base64)
    const qrDataUrl = await Qrcode.toDataURL(
      JSON.stringify({
        compra: codigoUnico,
        funcion: IdFuncion,
        usuario: IdUsuario,
      }),
      { width: 300, margin: 2 }
    );
    return qrDataUrl;
  })
);
const qrString = qrs.join('|||');

       // Crear la compra
    const nuevaCompra = new Compra(
      // El id lo crea la bd
      MetodoPago,
      new Date(),     // Fecha de compra generada por el servidor
      CantEntradas,
      precioTotal,
      qrString,
      usuario,
      funcion
    )

    // restar capacidad de la función
    funcion.CapacidadDisponible -= CantEntradas
   
    // Guardar todo en una transacción
    em.persist(nuevaCompra)
    await em.flush()

    return nuevaCompra
  })
    
  return res.status(201).json({
    mensaje: 'Compra realizada con éxito',
    data: nuevaCompra
    })

  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}


async function ListarCompras(em: EntityManager, req: Request, res: Response) {
  try {
    const compras = await em.find(
      Compra,
      {},
      {
        populate: ['usuario', 'funcion', 'funcion.pelicula', 'funcion.sala'],
        orderBy: { Fecha: 'DESC' }
      }
    );

    return res.status(200).json({
      mensaje: 'Compras encontradas',
      data: compras
    });
  } catch (error: any) {
    return res.status(500).json({
      mensaje: error.message
    });
  }
}

async function ListarComprasPorUsuario(em: EntityManager, req: AuthRequest, res: Response) {
  try {
     const usuarioId = req.user?.idUsuario;

    if (!usuarioId) {
      return res.status(401).json({ mensaje: 'No autenticado' });
    }
    
    const compras = await em.find(
      Compra,
      { usuario: { IdUsuario: usuarioId } },
      {
        populate: ['usuario', 'funcion', 'funcion.pelicula', 'funcion.sala'],
        orderBy: { Fecha: 'DESC' }
      }
    );

    return res.status(200).json({
      mensaje: 'Compras encontradas',
      data: compras
    });
  } catch (error: any) {
    return res.status(500).json({
      mensaje: error.message
    });
  }
}

export { sanitizeCompraInput, CrearCompra, ListarCompras, ListarComprasPorUsuario }