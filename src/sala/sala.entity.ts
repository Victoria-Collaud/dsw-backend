import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es'
import { PrimaryKeyProp } from '@mikro-orm/core'

@Entity()
export class Sala {

  [PrimaryKeyProp]?: 'NumSala';

  @PrimaryKey({ type: Number })
  NumSala!: number

  @Property({ type: Number })
  Capacidad!: number

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
