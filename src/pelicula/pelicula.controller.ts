/* 
get all
get por titulo
get por genero
delete
*/

import  { Request, Response} from "express";
import { Pelicula } from "./pelicula.entity.js"
import { orm } from "../shared/db/orm.js"
import { Genero } from "../genero/genero.entity.js";


const em = orm.em // entity manager

 function sanitizePeliculaInput(req: Request, res: Response, next:Function) { //era nextfunction
    req.body.sanitizedInput = {
        IdPelicula: req.body.IdPelicula,
        TituloPelicula: req.body.TituloPelicula,
        Sinopsis: req.body.Sinopsis,
        Duracion: req.body.Duracion,
        Clasificacion: req.body.Clasificacion,
        CodGenero: req.body.CodGenero,        
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
    const peliculas = await em.find(Pelicula, {})
    res.status(200).json({ message: 'Listado de todas las películas', data: peliculas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function BuscarPorTitulo(req: Request, res: Response) {
    try {
    // Obtenemos el texto ingresado en la URL (por ejemplo: /api/peliculas/padrino)
    const tituloBuscado = req.params.TituloPelicula

    // Buscamos con $ilike para coincidencia parcial e insensible a mayúsculas/minúsculas
    const pelicula = await em.findOneOrFail(
      Pelicula,
      { TituloPelicula: { $ilike: `%${tituloBuscado}%` } },
      { populate: ['genero'] } // Carga la relación con Genero
    )

    res.status(200).json({ message: 'Película encontrada', data: pelicula })
  } catch (error: any) {
    res.status(404).json({ message: 'No se encontró ninguna película con ese título', error: error.message })
  }
}


async function BuscarPorGenero(req:Request, res:Response) {
    try {
    const CodGenero = Number(req.params.Genero)
    const peliculas = await em.find(Pelicula, { genero: CodGenero })
    res.status(200).json({ message: 'found peliculas', data: peliculas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  } 
};


async function AgregarPelicula (req:Request, res:Response) { 
    try {
    const { TituloPelicula, Sinopsis, Duracion, Clasificacion, CodGenero } = req.body

    // 1. Buscar el género en la BD
    const genero = await em.findOne(Genero, { CodGenero: CodGenero })
    if (!genero) {
      return res.status(404).json({ mensaje: 'El género no existe' })
    }

    // 2. Crear la película con el objeto Genero
    const nuevaPelicula = new Pelicula(
      0,
      TituloPelicula,
      Sinopsis,
      Duracion,
      Clasificacion,
      genero  // <-- Pasamos el objeto, no el número
    )

    em.persist(nuevaPelicula)
    await em.flush()

    return res.status(201).json(nuevaPelicula)

  } catch (error: any) {
    res.status(500).json({ message: error.message })
  } 
} 

async function BorrarPelicula(req: Request, res: Response) { //esta es solo para admins
   try {
    const IdPelicula = Number(req.params.IdPelicula)
    const pelicula = em.getReference(Pelicula, IdPelicula)
    em.remove(pelicula)
    await em.flush()
    res.status(200).json({ message: 'Pelicula borrada' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizePeliculaInput, findAll, BuscarPorTitulo, BuscarPorGenero, AgregarPelicula, BorrarPelicula }