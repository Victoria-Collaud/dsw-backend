import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/decorators/es'
import { Usuario } from '../usuario/usuario.entity.js';
import { Funcion } from '../funcion/funcion.entity.js';

export enum MetodoPago {
  TARJETA_CREDITO = 'TARJETA_CREDITO',
  TARJETA_DEBITO = 'TARJETA_DEBITO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  MERCADO_PAGO = 'MERCADO_PAGO',
}

@Entity()
export class Compra {
    @PrimaryKey({ type: Number })
    IdCompra?: number;

    @Enum(() => MetodoPago)
    MetodoPago!: MetodoPago;

    @Property({ type: Date })
    Fecha!: Date;

    @Property({ type: 'text', nullable: true })
    AsientosElegidos!: string; // Almacena los asientos elegidos como una cadena separada por comas

    @Property({ type: Number })
    CantEntradas!: number;

    @Property({ type: Number })
    Precio!: number; //definido EN SALA

    @Property({ type: 'text' })
    QREntradas!: string; // Almacena los códigos QR como una cadena separada por "|||"

    @ManyToOne(() => Usuario)
    usuario!: Usuario;
    
    @ManyToOne(() => Funcion)
    funcion!: Funcion;

    constructor(
        MetodoPago: MetodoPago,
        Fecha: Date,
        AsientosElegidos: string[] = [],
        CantEntradas: number,
        Precio: number,
        QREntradas: string,
        usuario: Usuario,
        funcion: Funcion
    ) {
        this.MetodoPago = MetodoPago;
        this.Fecha = Fecha;
        this.AsientosElegidos = AsientosElegidos.join(',');
        this.CantEntradas = CantEntradas;
        this.Precio = Precio;
        this.QREntradas = QREntradas;
        this.usuario = usuario;
        this.funcion = funcion;
    }
}