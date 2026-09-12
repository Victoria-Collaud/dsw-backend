export interface Repository<T> {
  findAll(): Promise<T[] | undefined>
  findOne(item: {NumSala:number}): Promise<T | undefined>   
  add(item: T): Promise<T | undefined>
  update(id: string, item: T): Promise<T | undefined>
  delete(item: {NumSala:number}): Promise<T | undefined>
}

// CODIGO ASINCRONICO PROMISE  DEVUELVO UNA PROMESA 

