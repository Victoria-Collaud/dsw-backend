import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es'
import { DateType, PrimaryKeyProp } from '@mikro-orm/core'

@Entity()
export class Usuario {

  [PrimaryKeyProp]?: 'IdUsuario';

  @PrimaryKey({ type: Number })
  IdUsuario!: number

  @Property({ type: DateType })
  FechaNacimiento!: DateType

  @Property({ type: String })
  GmailUsuario!: string
    
  @Property({ type: String })
  RolUsuario!: string

  constructor(
    IdUsuario: number,
    FechaNacimiento: DateType,
    GmailUsuario: string,
    RolUsuario: string,
  ) {
    this.IdUsuario = IdUsuario
    this.FechaNacimiento = FechaNacimiento
    this.GmailUsuario = GmailUsuario
    this.RolUsuario = RolUsuario
  }
}
