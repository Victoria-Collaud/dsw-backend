import { Repository } from "../shared/repository.js";
import { Sala } from './sala.entitiy.js';
//import{db} from '../shared/db/conn.js'
//import { ObjectId } from "mongodb";
import {pool} from '../shared/db/conn.mysql.js'
import { ResultSetHeader } from "mysql2";

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
   const { NumSala, Capacidad, TipoPantalla, TipoAsientos } = item
   const [result] = await pool.query<ResultSetHeader>('Insert into salas set ?', [{ NumSala, Capacidad, TipoPantalla, TipoAsientos }])
   item.NumSala = result.insertId //id incremental
   return item }

public async update(NumSala: number, salainput: Sala): Promise<Sala | undefined> { 
  const numSala = Number(NumSala)
   await pool.query('update salas set ? where NumSala = ?', [salainput, numSala])
 return await this.findOne({ NumSala: numSala })
}


public async delete(item: { NumSala: number }): Promise< Sala | undefined>{
  try {
    const salaborrar = await this.findOne({ NumSala: Number(item.NumSala) })
    const numSala = Number(item.NumSala)
      await pool.query('delete from salas where NumSala = ?', numSala)
      return salaborrar
  } catch (error: any) { 
   throw new Error('no se puede borrar la sala')
  }
}
}
/*  public async delete(item: { id: string }): Promise<Character | undefined> {
    try {item.NumSala
      const characterToDelete = await this.findOne(item)
      const characterId = Number.parseInt(item.id)
      await pool.query('delete from characterItems where characterId = ?', characterId)
      await pool.query('delete from characters where id = ?', characterId)
      return characterToDelete
    } catch (error: any) {
      throw new Error('unable to delete character')
    }
  }
}*/