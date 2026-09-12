import { Repository } from "../shared/repository.js";
import { Sala } from './sala.entitiy.js';


const SalaInstances = [
    new Sala(
        1,
        100, 
        "2D", 
        "Reclinables"),] 


export class SalaRepository implements Repository<Sala> {

public async findAll(): Promise< Sala[] | undefined > {
    return await SalaInstances; 
}
public async findOne(item: {NumSala:number;}): Promise<Sala | undefined >{
    return await SalaInstances.find((sala) => sala.NumSala === item.NumSala);
  }
public async add(item: Sala): Promise< Sala | undefined> {
    const existingSala = SalaInstances.find((sala) => sala.NumSala === item.NumSala)
    if (existingSala) {
        return undefined
    }

    SalaInstances.push(item);
    return await item;
  }
public async update(id: string, item: Sala): Promise<Sala | undefined> {
    const salaidx = SalaInstances.findIndex((sala) => sala.NumSala === Number(id))
        if (salaidx !== -1) {
            SalaInstances[salaidx] = {...SalaInstances[salaidx], ...item }
        }
        return await SalaInstances[salaidx]
    }

public async delete(item: {NumSala:number;}): Promise< Sala | undefined>{
    
const salaidx = SalaInstances.findIndex((sala) => sala.NumSala === item.NumSala) 
  
    if(salaidx !== -1) {    
        const deletedsala = SalaInstances[salaidx]
            SalaInstances.splice(salaidx, 1)
        return await deletedsala
    }
  }

}