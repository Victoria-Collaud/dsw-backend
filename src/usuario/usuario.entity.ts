import { Entity, PrimaryKey, Property, Enum} from '@mikro-orm/decorators/es'
import { PrimaryKeyProp } from '@mikro-orm/core'

export enum RolUsuario {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
}

@Entity()
export class Usuario {

  [PrimaryKeyProp]?: 'IdUsuario';

  @PrimaryKey({ type: Number })
  IdUsuario!: number

  @Property({ type: Date })
  FechaNacimiento!: Date

  @Property({ type: String })
  EmailUsuario!: string

  @Property({ type: 'string', hidden: true })
  ContrasenaHash!: string
    
  @Enum(() => RolUsuario)
  rol: RolUsuario = RolUsuario.CLIENTE;

  constructor(
    IdUsuario: number,
    FechaNacimiento: Date,
    EmailUsuario: string,
    ContrasenaHash: string,
    rol: RolUsuario,
  ) {
    this.IdUsuario = IdUsuario
    this.FechaNacimiento = FechaNacimiento
    this.EmailUsuario = EmailUsuario
    this.ContrasenaHash = ContrasenaHash
    this.rol = rol
  }
}
