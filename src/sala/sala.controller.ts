import  { Request, Response} from "express";
//import { SalaRepository } from "./sala.repository.js";
import { Sala } from "./sala.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em // entity manager

//const repository = new SalaRepository()

 function sanitizeSalaInput(req: Request, res: Response, next:Function) { //era nextfunction
    req.body.sanitizedInput = {
        NumSala: req.body.NumSala,
        Capacidad: req.body.Capacidad,
        TipoPantalla: req.body.TipoPantalla,
        TipoAsientos: req.body.TipoAsientos,        
        }

    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
      }
    })
next ()
}


async function findAll (req:Request, res:Response) {
try {
    const salas = await em.find(Sala, {})
    res.status(200).json({ message: 'Listado de todas las salas', data: salas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
 

async function findOne(req:Request, res:Response) {
    try {
    const NumSala = Number(req.params.NumSala)
    const sala = await em.findOneOrFail(Sala, { NumSala })
    res.status(200).json({ message: 'found sala', data: sala })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  } 
 // res.status(500).send({ message: 'No implementado'})
};

//Crea sala       
async function add (req:Request, res:Response) { 
      try {
    const sala = em.create(Sala, req.body)
    await em.flush()
    res.status(201).json({ message: 'sala creada', data: sala })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
} 


//Busca y modifica sala totalmente
async function update (req:Request, res:Response) { 
try {
    const NumSala = Number(req.params.NumSala)
    const salaToUpdate = await em.findOneOrFail(Sala, { NumSala })
    em.assign(salaToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'sala updated', data: salaToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


//Borra ( agregamos a la class import { PrimaryKeyProp } from '@mikro-orm/core' para que lea NmSala como primary key y no como atributo de la clase)
async function remove(req: Request, res: Response) {
   try {
    const NumSala = Number(req.params.NumSala)
    const sala = em.getReference(Sala, NumSala)
    em.remove(sala)
    await em.flush()
    res.status(200).json({ message: 'Sala borrada' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}



export { findAll, findOne, add, update, remove, sanitizeSalaInput } 