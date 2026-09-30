import  { NextFunction, Request, Response} from "express";
import { Pelicula } from "./pelicula.entity.js"
import { orm } from "../shared/db/orm.js"
import { Genero } from "../genero/genero.entity.js";
import { Funcion } from "../funcion/funcion.entity.js";


const em = orm.em // entity manager

 function sanitizePeliculaInput(req: Request, res: Response, next:NextFunction) { 
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
    res.status(200).json({ mensaje: 'Listado de todas las películas', data: peliculas })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}

async function BuscarPorTitulo(req: Request, res: Response) {
    try {
    // Obtenemos el texto ingresado en la URL (por ejemplo: /api/peliculas/padrino)
    const tituloBuscado = req.query.titulo

    // Buscamos con $ilike para coincidencia parcial e insensible a mayúsculas/minúsculas
    const peliculas = await em.find(
      Pelicula,
      { TituloPelicula: { $like: `%${tituloBuscado}%` } },
      { populate: ['genero'] } // Carga la relación con Genero
    )

     if (peliculas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron películas con ese título' })
    }

    return res.status(200).json({ mensaje: 'Películas encontradas', data: peliculas })

  } catch (error: any) {
    res.status(404).json({ mensaje: 'No se encontró ninguna película con ese título', error: error.message })
  }
}


async function BuscarPorGenero(req:Request, res:Response) {
    try {
    const CodGenero = Number(req.params.CodGenero)
    const peliculas = await em.find(Pelicula, { genero: CodGenero }, { populate: ['genero'] }) // Carga la relación con Genero
   if (peliculas.length === 0) {
      return res.status(404).json({ mensaje: 'No hay películas de ese género' })
    }
    return res.status(200).json({ mensaje: 'Películas encontradas', data: peliculas })

  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  } 
};


async function AgregarPelicula (req:Request, res:Response) {  //esta es solo para admins
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
      genero  // Pasamos el objeto no el número
    )

    em.persist(nuevaPelicula)
    await em.flush()

    return res.status(201).json(nuevaPelicula)

  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  } 
} 

async function BorrarPelicula(req: Request, res: Response) { //esta es solo para admins
   try {
    const IdPelicula = Number(req.params.IdPelicula)
    const pelicula = await em.findOne(Pelicula, { IdPelicula })
    if (!pelicula) {
      return res.status(404).json({ mensaje: 'Película no encontrada' })
    }
    const funcionesAsociadas = await em.count(Funcion, { pelicula: { IdPelicula: IdPelicula } })
    if (funcionesAsociadas > 0) {
    return res.status(400).json({ 
      mensaje: 'No se puede borrar la película porque tiene funciones asociadas' 
    })
  }
    em.remove(pelicula)
    await em.flush()
    res.status(200).json({ mensaje: 'Pelicula borrada' })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}

export { sanitizePeliculaInput, findAll, BuscarPorTitulo, BuscarPorGenero, AgregarPelicula, BorrarPelicula }