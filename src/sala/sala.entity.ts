import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es'
/*¿Qué son los decoradores? Son esas palabras que empiezan con @.
 En TypeScript funcionan como "etiquetas" que le añaden superpoderes y metadatos a tus clases y atributos.

Entity: Le indica a MikroORM que esta clase representa una tabla en la base de datos.

PrimaryKey: Define cuál es la columna que actúa como clave primaria
 (el identificador único de cada registro).

Property: Le dice a MikroORM que un atributo de la clase debe convertirse en una columna de la tabla.*/

@Entity()
export class Sala {
  @PrimaryKey({ type: Number })
  id!: number

  @Property({ type: Number })
  NumSala!: number

  @Property({ type: Number })
  Capacidad!: number

  @Property({ type: String })
  TipoPantalla!: string

  @Property({ type: String })
  TipoAsientos!: string

  constructor(
    NumSala: number,
    Capacidad: number,
    TipoPantalla: string,
    TipoAsientos: string,
  ) {
    this.NumSala = NumSala
    this.Capacidad = Capacidad
    this.TipoPantalla = TipoPantalla
    this.TipoAsientos = TipoAsientos
  }
}
