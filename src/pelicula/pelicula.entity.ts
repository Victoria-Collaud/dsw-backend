import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/es'
import { PrimaryKeyProp } from '@mikro-orm/core'
import { Genero } from '../genero/genero.entity.js';
//import { ManyToOne } from '@mikro-orm/decorators/legacy';

@Entity()
export class Pelicula {

  [PrimaryKeyProp]?: 'IdPelicula';

  @PrimaryKey({ type: Number })
  IdPelicula!: number

    @Property({ type: String })
    TituloPelicula!: string
    
    @Property({ type: String })
    Sinopsis!: string

    @Property({ type: Number })
    Duracion!: number

    @Property({ type: String })
    Clasificacion!: string

    @ManyToOne(() => Genero)
    genero!: Genero

    /* @OneToMany(() => Funcion, f => f.pelicula)
    funciones = new Collection<Funcion>(this)
*/
    constructor(
        IdPelicula: number,
        TituloPelicula: string,
        Sinopsis: string,
        Duracion: number,
        Clasificacion: string,
        genero: Genero,
    ) {
        this.IdPelicula = IdPelicula
        this.TituloPelicula = TituloPelicula
        this.Sinopsis = Sinopsis
        this.Duracion = Duracion
        this.Clasificacion = Clasificacion
        this.genero = genero
    }
}
