import  { Request, Response} from "express";
import { Genero } from "./genero.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em // entity manager


 function sanitizeGeneroInput(req: Request, res: Response, next:Function) { //era nextfunction
    req.body.sanitizedInput = {
        CodGenero: req.body.CodGenero,
        NombreGenero: req.body.NombreGenero
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
    const generos = await em.find(Genero, {})
    res.status(200).json({ message: 'Listado de todos los géneros de películas', data: generos })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
 

async function findOne(req:Request, res:Response) {
    try {
    const CodGenero = Number(req.params.CodGenero)
    const genero = await em.findOneOrFail(Genero, { CodGenero })
    res.status(200).json({ message: 'found genero', data: genero })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  } 

};

//Crea sala       
async function add (req:Request, res:Response) { 
      try {
    const genero = em.create(Genero, req.body)
    await em.flush()
    res.status(201).json({ message: 'Género de película agregado', data: genero })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
} 


//Busca y modifica sala totalmente
async function update (req:Request, res:Response) { 
try {
    const CodGenero = Number(req.params.CodGenero)
    const generoToUpdate = await em.findOneOrFail(Genero, { CodGenero })
    em.assign(generoToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Género de película actualizado', data: generoToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


//Borra ( agregamos a la class import { PrimaryKeyProp } from '@mikro-orm/core' para que lea NmSala como primary key y no como atributo de la clase)
async function remove(req: Request, res: Response) {
   try {
    const CodGenero = Number(req.params.CodGenero)
    const genero = em.getReference(Genero, CodGenero)
    em.remove(genero)
    await em.flush()
    res.status(200).json({ message: 'Género de película borrado' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}



export { findAll, findOne, add, update, remove, sanitizeGeneroInput } 