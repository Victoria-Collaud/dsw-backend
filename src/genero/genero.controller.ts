import  { NextFunction, Request, Response} from "express";
import { Genero } from "./genero.entity.js";
import { orm } from "../shared/db/orm.js";
import { Pelicula } from "../pelicula/pelicula.entity.js";

const em = orm.em // entity manager

 function sanitizeGeneroInput(req: Request, res: Response, next:NextFunction) {
    req.body.sanitizedInput = {
        NombreGenero: req.body.NombreGenero
        }
    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
      }
    })
next ()
}

async function findAllGeneros (req:Request, res:Response) {
try {
    const generos = await em.find(Genero, {})
    res.status(200).json({ mensaje: 'Listado de todos los géneros de películas', data: generos })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}
 

async function findOneGenero(req:Request, res:Response) {
    try {
    const CodGenero = Number(req.params.CodGenero)
    const genero = await em.findOneOrFail(Genero, { CodGenero })
    res.status(200).json({ mensaje: 'Género de película encontrado', data: genero })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  } 

};

//Crea genero       
async function AgregarGenero (req:Request, res:Response) { 
      try {
    const { NombreGenero } = req.body.sanitizedInput
    const genero = new Genero(NombreGenero)
    em.persist(genero)
    await em.flush()
    res.status(201).json({ mensaje: 'Género de película agregado', data: genero })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
} 


//Busca y modifica genero 
async function ActualizarGenero (req:Request, res:Response) { 
try {
    const CodGenero = Number(req.params.CodGenero)
    const generoToUpdate = await em.findOneOrFail(Genero, { CodGenero })
    em.assign(generoToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ mensaje: 'Género de película actualizado', data: generoToUpdate })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}


//Borra genero
async function BorrarGenero(req: Request, res: Response) {
   try {
    const CodGenero = Number(req.params.CodGenero);
    //  Busca el género
    const genero = await em.findOne(Genero, { CodGenero });
    if (!genero) {
      return res.status(404).json({ mensaje: 'Género no encontrado' });
    }
    // Verificar si tiene películas asociadas
    const peliculasAsociadas = await em.count(Pelicula, { genero: genero });
    if (peliculasAsociadas > 0) {
      return res.status(400).json({ 
        mensaje: `No se puede eliminar el género porque tiene ${peliculasAsociadas} película(s) asociada(s).` 
      });
    }

    em.remove(genero)
    await em.flush()
    res.status(200).json({ mensaje: 'Género de película borrado' })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}


export { findAllGeneros, findOneGenero, AgregarGenero, ActualizarGenero, BorrarGenero, sanitizeGeneroInput } 