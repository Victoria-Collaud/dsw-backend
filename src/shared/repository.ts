export interface Repository<T> {
    findAll(): T[] | undefined 
    findOne(item: {NumSala:number}): T | undefined
    add(item: T): T | undefined
    update(item: T): T | undefined
    delete(item: {NumSala:number}): T | undefined
}