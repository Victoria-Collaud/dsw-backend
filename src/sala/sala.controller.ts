import  { NextFunction, Request, Response} from "express";
import { Sala } from "./sala.entity.js";
import { orm } from "../shared/db/orm.js";
import { generarAsientos } from './sala.utils.js';
import { Funcion } from "../funcion/funcion.entity.js";

const em = orm.em // entity manager

 function sanitizeSalaInput(req: Request, res: Response, next:NextFunction) { 
    req.body.sanitizedInput = {
        NumSala: req.body.NumSala,
        Capacidad: req.body.Capacidad,
        TipoPantalla: req.body.TipoPantalla,
        TipoAsientos: req.body.TipoAsientos,  
        PrecioSala: req.body.PrecioSala      
        }
    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
      }
    })
next ()
}

async function findAllSalas (req:Request, res:Response) {
try {
    const salas = await em.find(Sala, {})
    res.status(200).json({ mensaje: 'Listado de todas las salas', data: salas })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}
 

async function findOneSala(req:Request, res:Response) {
    try {
    const NumSala = Number(req.params.NumSala)
    const sala = await em.findOneOrFail(Sala, { NumSala })
    res.status(200).json({ mensaje: ' sala encontrada', data: sala })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  } 
};

//Crea sala       
async function AgregarSala (req:Request, res:Response) { 
      try {
    const sala = em.create(Sala, req.body)
    await em.flush()
    res.status(201).json({ mensaje: 'sala creada', data: sala })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
} 

//Busca y modifica sala totalmente
async function ActualizarSala (req:Request, res:Response) { 
try {
    const NumSala = Number(req.params.NumSala)
    const salaToUpdate = await em.findOneOrFail(Sala, { NumSala })
    em.assign(salaToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ mensaje: 'sala actualizada', data: salaToUpdate })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}


//Borra ( agregamos a la class import { PrimaryKeyProp } from '@mikro-orm/core' para que lea NmSala como primary key y no como atributo de la clase)
async function BorrarSala(req: Request, res: Response) {
   try {
    const NumSala = Number(req.params.NumSala)
    // Buscar la sala
    const sala = await em.findOne(Sala, { NumSala });
    if (!sala) {
      return res.status(404).json({ mensaje: 'Sala no encontrada' });
    }
    // Verificar si tiene funciones FUTURAS
    const hoy = new Date();
    const funcionesFuturas = await em.count(Funcion, {
      sala: sala,
      Fecha: { $gte: hoy } // Busca funciones con fecha mayor o igual a hoy
    });
    if (funcionesFuturas > 0) {
      return res.status(400).json({ 
        mensaje: `No se puede eliminar la sala porque tiene ${funcionesFuturas} función(es) programada(s) a futuro.` 
      });
    }
    // Si no tiene funciones futuras, borrar
    em.remove(sala);
    await em.flush();
    return res.status(200).json({ mensaje: 'Sala borrada' });

  } catch (error: any) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function ObtenerAsientosDeSala(req: Request, res: Response) {
  try {
    const { NumSala } = req.params;
    const sala = await em.findOne(Sala, { NumSala: Number(NumSala) });
    if (!sala) return res.status(404).json({ mensaje: 'Sala no encontrada' });

    const asientos = generarAsientos(sala.Capacidad);
    return res.status(200).json({ mensaje: 'Asientos generados', data: asientos });
  } catch (error: any) {
    return res.status(500).json({ mensaje: error.message });
  }
}


export { findAllSalas, findOneSala, AgregarSala, ActualizarSala, BorrarSala, sanitizeSalaInput, ObtenerAsientosDeSala } 