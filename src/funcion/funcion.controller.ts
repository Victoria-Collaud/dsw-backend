import  { NextFunction, Request, Response} from "express";
import { Funcion } from "./funcion.entity.js"
import { orm } from "../shared/db/orm.js"
import { Pelicula } from "../pelicula/pelicula.entity.js";
import { Sala } from "../sala/sala.entity.js";


const em = orm.em // entity manager

 function sanitizeFuncionInput(req: Request, res: Response, next: NextFunction) { 
    req.body.sanitizedInput = {
        IdFuncion: req.body.IdFuncion,
        Idioma: req.body.Idioma,
        Fecha: req.body.Fecha,
        Horario: req.body.Horario,
        // CapacidadDisponible: req.body.CapacidadDisponible,
        IdPelicula: req.body.IdPelicula,
        NumSala: req.body.NumSala,
        }

    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
      }
    })
next ()
}

async function FuncionesdeunaPelicula (req:Request, res:Response) {
try {
    const IdPelicula = Number(req.params.IdPelicula)
   const funciones = await em.find(
      Funcion,
      { pelicula: { IdPelicula } },
      {
        populate: ['pelicula', 'sala'],  // Cargar relaciones
        orderBy: { Fecha: 'ASC', Horario: 'ASC' }  // Ordena por fecha y hora
      }
    )
    if (funciones.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron funciones para esa película'
      })
    }
    return res.status(200).json({
      mensaje: 'Funciones encontradas',
      data: funciones
    })
} catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  } 
} 

//falta comprobación de que el horario en esa sala esté disponible
async function AgregarFuncion (req:Request, res:Response) { //esta es solo para admins
    try {
    const { Idioma, Fecha, Horario, IdPelicula, NumSala } = req.body

    // Busca la película en la BD
    const pelicula = await em.findOne(Pelicula, { IdPelicula: IdPelicula })
    if (!pelicula) {
      return res.status(404).json({ mensaje: 'La película no existe' })
    }
    //busca la sala en la BD
    const sala = await em.findOne(Sala, { NumSala: NumSala })
    if (!sala) {
      return res.status(404).json({ mensaje: 'La sala no existe' })
    }

     // Verificar que la sala esté libre en esa fecha y horario
    const funcionExistente = await em.findOne(Funcion, {
      sala: { NumSala },
      Fecha: new Date(Fecha),
      Horario
    })

    if (funcionExistente) {
      return res.status(400).json({
        mensaje: `La sala ${NumSala} ya está ocupada el ${Fecha} a las ${Horario}`
      })
    }
    // Crear la función con el objeto Pelicula y sala
    const nuevaFuncion = new Funcion(
      0,
      Idioma,
       new Date(Fecha), 
      Horario,
      sala.Capacidad, // Usamos la capacidad de la sala 
      pelicula,
      sala
    )

    em.persist(nuevaFuncion)
    await em.flush()

    return res.status(201).json(nuevaFuncion)

  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  } 
} 

async function BorrarFuncion(req: Request, res: Response) { //esta es solo para admins
   try {
    const IdFuncion = Number(req.params.IdFuncion)
    const funcion = em.getReference(Funcion, IdFuncion)
    em.remove(funcion)
    await em.flush()
    res.status(200).json({ mensaje: 'Función borrada' })
  } catch (error: any) {
    res.status(500).json({ mensaje: error.message })
  }
}

export { sanitizeFuncionInput, FuncionesdeunaPelicula, AgregarFuncion, BorrarFuncion }