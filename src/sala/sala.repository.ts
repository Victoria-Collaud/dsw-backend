import { Repository } from "../shared/repository.js";
import { Sala } from './sala.entitiy.js';
import{db} from '../shared/db/conn.js'
import { ObjectId } from "mongodb";

const SalaInstancesArray = [
    new Sala(
        1,
        100, 
        "2D", 
        "Reclinables"),] 

const SalaInstances = db.collection<Sala>('salas')

export class SalaRepository implements Repository<Sala> {
public async findAll(): Promise<Sala[] | undefined> {
    return await SalaInstances.find().toArray()
}

public async findOne(item: { id: string }): Promise<Sala | undefined> {
    const _id = new ObjectId(item.id)
    return (await SalaInstances.findOne({ _id })) || undefined
 }
public async add(item: Sala): Promise< Sala | undefined> {
     item._id = (await SalaInstances.insertOne(item)).insertedId
    return item
  }
  
public async update(id: string, item: Sala): Promise<Sala | undefined> {
    const _id = new ObjectId(id)
    return (await SalaInstances.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined
}


public async delete(item: { id: string}): Promise< Sala | undefined>{
    const _id = new ObjectId(item.id)
    return (await SalaInstances.findOneAndDelete({  _id  })) || undefined
}

}