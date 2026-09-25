import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es'
import { PrimaryKeyProp } from '@mikro-orm/core'

@Entity()
export class Genero {

  [PrimaryKeyProp]?: 'CodGenero';

  @PrimaryKey({ type: Number })
  CodGenero!: number

  @Property({ type: String })
  NombreGenero!: string


  constructor(
    CodGenero: number,
    NombreGenero: string
    
  )  {
    this.CodGenero = CodGenero
    this.NombreGenero = NombreGenero
  }  
}
