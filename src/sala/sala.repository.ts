import { Repository } from "../shared/repository.js";
import { Sala } from './sala.entitiy.js';


const SalaInstances = [
    new Sala(
        1,
        100, 
        "2D", 
        "Reclinables"),] 


export class SalaRepository implements Repository<Sala> {

public  findAll(): Sala[] | undefined  {
    return SalaInstances; 
}
public findOne(item: {NumSala:number;}): Sala | undefined {
    return SalaInstances.find((sala) => sala.NumSala === item.NumSala);
  }
public add(item: Sala): Sala | undefined {
    SalaInstances.push(item);
    return item;
  }
public update(item: Sala): Sala | undefined {
    const salaidx = SalaInstances.findIndex((sala) => sala.NumSala === item.NumSala)
        if (salaidx !== -1) {
            SalaInstances[salaidx] = {...SalaInstances[salaidx], ...item }
        }
        return SalaInstances[salaidx]
    }

public delete(item: {NumSala:number;}): Sala | undefined {
    
const salaidx = SalaInstances.findIndex((sala) => sala.NumSala === item.NumSala) 
  
    if(salaidx !== -1) {    
        const deletedsala = SalaInstances[salaidx]
            SalaInstances.splice(salaidx, 1)
        return deletedsala
    }
  }

}