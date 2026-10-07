import  { NextFunction, Request, Response} from "express";
import { Sala } from "./sala.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em // entity manager

// son todas para admins (no hay que ponerle el middleware de auth porque ya lo tiene la ruta??)

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
    const sala = em.getReference(Sala, NumSala)
    em.remove(sala)
    await em.flush()
    res.status(200).json({ mensaje: 'Sala borrada' })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}



export { findAllSalas, findOneSala, AgregarSala, ActualizarSala, BorrarSala, sanitizeSalaInput } 