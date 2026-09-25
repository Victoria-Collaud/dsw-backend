import  { Request, Response} from "express";
//import { SalaRepository } from "./sala.repository.js";
import { Sala } from "./sala.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em // entity manager Te permite interactuar directamente con la tabla de Sala sin necesidad de escribir SQL a mano.

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

/*async/await pausa la ejecución de esta función
 hasta que la base de datos responda, evitando congelar el servidor.
 
 try / catch: Manejo de errores. Si la base de datos se cae o falla la consulta, 
 el código salta automáticamente al bloque catch en lugar de romper el servidor.*/
async function findAll (req:Request, res:Response) {
try {
    const salas = await em.find(Sala, {})/*Le pide a MikroORM que busque todas las instancias de la entidad Sala. El objeto vacío {} significa "sin ningún filtro" (traé todo).*/
    res.status(200).json({ message: 'Listado de todas las salas', data: salas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
 

async function findOne(req: Request, res: Response) {
  try {
    const numSala = Number(req.params.numSala) //parseInt convierte el string a número
    
    const sala = await em.findOneOrFail(Sala, { NumSala: numSala })
    
    res.status(200).json({ message: 'Sala encontrada', data: sala })
  }catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
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
 res.status(500).send({ message: 'No implementado'})
}


//Borra
async function remove(req: Request, res: Response) {
  res.status(500).send({ message: 'No implementado'})
}



export { findAll, findOne, add, update, remove, sanitizeSalaInput } 