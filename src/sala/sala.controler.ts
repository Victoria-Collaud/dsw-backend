import  { Request, Response, NextFunction } from "express";
import { SalaRepository } from "./sala.repository.js";
import { Sala } from "./sala.entitiy.js";

const repository = new SalaRepository()

 function sanitizeSalaInput(req: Request, res: Response, next:NextFunction) {
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
    res.json({data: await repository.findAll() })
} 

async function findOne(req:Request, res:Response) {
  const sala = await repository.findOne({ NumSala: Number(req.params.id) })
if (!sala){
    return res.status(404).send({ message: 'La sala no existe' })
     }
     res.send({ data: sala }) };

//Crea sala       
async function add (req:Request, res:Response) { 
    const input = req.body.sanitizedInput
    
    const Salainput = new Sala(
        input.NumSala, 
        input.Capacidad, 
        input.TipoPantalla, 
        input.TipoAsientos)
        
    const sala = await   repository.add(Salainput)
     return res.status(201).send({ message: 'Sala creada correctamente', data: sala }) 
} 


//Busca y modifica sala totalmente
async function update (req:Request, res:Response) { 
  const sala = await repository.update(String(req.params.id), req.body.sanitizedInput)
    
    if (!sala) { 
       return res.status(404).send({ message: 'La sala no existe' } )
     }

    return res.status(200).send({ message: 'Sala actualizada correctamente', data: sala })
}


//Borra
async function remove(req: Request, res: Response) {
  const sala = await repository.delete({ id: String(req.params.id) })
    
  if(!sala){
    res.status(404).send( {  message:'sala no encontrada' } )
  } else{
    res.status(200).send({message:'sala eliminada correctamente'})
  }
}



export {sanitizeSalaInput, findAll, findOne, add, update, remove} 