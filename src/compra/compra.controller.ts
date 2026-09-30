/*
crear compra (descuenta capacidad de asientos)
listar compras de usuario?
cancelar compra?
*/
import  { NextFunction, Request, Response} from "express";
import { orm } from "../shared/db/orm.js"
import { Compra } from "./compra.entity.js"
import { Funcion } from "../funcion/funcion.entity.js"
import { EntityManager } from "@mikro-orm/core";
import { Usuario } from "../usuario/usuario.entity.js";
import { randomUUID } from "crypto"; //temporal

const em = orm.em // entity manager

function sanitizeCompraInput(req: Request, res: Response, next: NextFunction) { 
    req.body.sanitizedInput = {
        IdCompra: req.body.IdCompra,
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
        //falta autenticación de usuario
    const { IdUsuario, IdFuncion, CantEntradas, MetodoPago } = req.body.sanitizedInput
    // 1. Buscar la función con la sala cargada
    const funcion = await em.findOne(Funcion, { IdFuncion }, { populate: ['sala'] })
    if (!funcion) {
      return res.status(404).json({ mensaje: 'La función no existe' })
    }
    // 2. Verificar capacidad
    if (funcion.CapacidadDisponible < CantEntradas) {
      return res.status(400).json({ 
        mensaje: `Solo quedan ${funcion.CapacidadDisponible} asientos disponibles` 
      })
    }

    // Busca el usuario
    const usuario = await em.findOne(Usuario, { IdUsuario: IdUsuario })
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }

    //calcula precio (por ahora)
    const precioUnitario = (funcion as any).Precio ?? 1000
    const precioTotal = precioUnitario * CantEntradas

    //falso qr
    const qrs = Array.from({ length: CantEntradas }, () => randomUUID()).join(',')

       // 7. Crear la compra
    const nuevaCompra = new Compra(
      0,
      MetodoPago,
      new Date(),           // Fecha de compra generada por el servidor
      CantEntradas,
      precioTotal,
      qrs,
      usuario,
      funcion
    )

    // restar capacidad de la función
    funcion.CapacidadDisponible -= CantEntradas
   // Guardar todo en una transacción
    em.persist(nuevaCompra)
    await em.flush()

    return res.status(201).json({
      mensaje: 'Compra realizada con éxito',
      data: nuevaCompra
    })

  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}

export { sanitizeCompraInput, CrearCompra }