import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/es'
import { PrimaryKeyProp } from '@mikro-orm/core'
import { Pelicula } from '../pelicula/pelicula.entity.js';
import { Sala } from '../sala/sala.entity.js';

@Entity()
export class Funcion {

  [PrimaryKeyProp]?: 'IdFuncion';

  @PrimaryKey({ type: Number })
  IdFuncion?: number

    @Property({ type: String })
    Idioma!: string

    @Property({ type: Date })
    Fecha!: Date

    @Property({ type: 'time' })
    Horario!: string

    @Property({ type: Number })
    CapacidadDisponible!: number

    @ManyToOne(() => Pelicula)
    pelicula!: Pelicula

    @ManyToOne(() => Sala)
    sala!: Sala

    constructor(
        //IdFuncion: number,
        Idioma: string,
        Fecha: Date,
        Horario: string,
        CapacidadDisponible: number,
        pelicula: Pelicula,
        sala: Sala
    ) {
        //this.IdFuncion = IdFuncion
        this.Idioma = Idioma
        this.Fecha = Fecha
        this.Horario = Horario
        this.CapacidadDisponible = CapacidadDisponible
        this.pelicula = pelicula
        this.sala = sala
    }
}
