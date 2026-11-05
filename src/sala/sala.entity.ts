import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es'
import { PrimaryKeyProp } from '@mikro-orm/core'


export enum Capacidad {
  PRIVADA = 24,  // 4 filas x 6 columnas
  CHICA = 40,    // 5 filas x 8 columnas
  MEDIANA = 64,  // 8 filas x 8 columnas
  GRANDE = 100,  // 10 filas x 10 columnas
  PLUS = 150,    // 10 filas x 15 columnas

}

@Entity()
export class Sala {

  [PrimaryKeyProp]?: 'NumSala';

  @PrimaryKey({ type: Number })
  NumSala!: number

  @Property({ type: Number })
  Capacidad!: number; 

  @Property({ type: String })
  TipoPantalla!: string

  @Property({ type: String })
  TipoAsientos!: string
  
  @Property({ type: Number })
  PrecioSala!: Number
  

  constructor(
    NumSala: number,
    Capacidad: number,
    TipoPantalla: string,
    TipoAsientos: string,
    PrecioSala: number
  ) {
    this.NumSala = NumSala
    this.Capacidad = Capacidad
    this.TipoPantalla = TipoPantalla
    this.TipoAsientos = TipoAsientos
    this.PrecioSala = PrecioSala
  }
}
