import { Repository } from "../shared/repository.js";
import { Sala } from './sala.entitiy.js';
//import{db} from '../shared/db/conn.js'
//import { ObjectId } from "mongodb";
import {pool} from '../shared/db/conn.mysql.js'

//const SalaInstancesArray = [
//    new Sala(
//        1,
//        100, 
//        "2D", 
//        "Reclinables"),] 

// const SalaInstances = db.collection<Sala>('salas')

export class SalaRepository implements Repository<Sala> {

public async findAll(): Promise<Sala[] | undefined> {
    const [salas] = await pool.query('SELECT * FROM salas ')
    //no tenemos items
    return salas as Sala[] //solo sirve si el interfaz es compatible
}

public async findOne(item: { NumSala: number }): Promise<Sala | undefined> {
   const [salas] = await pool.query('SELECT * FROM salas WHERE NumSala = ?', [item.NumSala])
   const fila = salas as Sala[]
   if (fila.length === 0) {
      return undefined
   }
   const sala = fila[0]
   return sala }

public async add(item: Sala): Promise< Sala | undefined> {
    // item._id = (await SalaInstances.insertOne(item)).insertedId
   // return item
  throw new Error ('No implementado')}
  
public async update(id: string, item: Sala): Promise<Sala | undefined> {
 //   const _id = new ObjectId(id)
 //   return (await SalaInstances.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined
throw new Error ('No implementado')}

public async delete(item: { id: string}): Promise< Sala | undefined>{
   // const _id = new ObjectId(item.id)
   // return (await SalaInstances.findOneAndDelete({  _id  })) || undefined
throw new Error ('No implementado')}
}