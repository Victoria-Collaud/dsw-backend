import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/decorators/es'
import { Usuario } from '../usuario/usuario.entity.js';
import { Funcion } from '../funcion/funcion.entity.js';
import { Sala } from '../sala/sala.entity.js';
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

   // @Property({ type: String })
   // Asientos!: string; // Almacena los asientos elegidos como una cadena separada por comas

    @Property({ type: Number })
    CantEntradas!: number;

    @Property({ type: Number })
    Precio!: number; //definido donde (?) EN SALA

    @Property({ type: String })
    QREntradas!: string; // Almacena los códigos QR como una cadena separada por comas

    @ManyToOne(() => Usuario)
    usuario!: Usuario;
    
    @ManyToOne(() => Funcion)
    funcion!: Funcion;


    constructor(
        //IdCompra: number,
        MetodoPago: MetodoPago,
        Fecha: Date,
        //Asientos: string,
        CantEntradas: number,
        Precio: number,
        QREntradas: string,
        usuario: Usuario,
        funcion: Funcion
    ) {
        //this.IdCompra = IdCompra;
        this.MetodoPago = MetodoPago;
        this.Fecha = Fecha;
        //this.Asientos = Asientos;
        this.CantEntradas = CantEntradas;
        this.Precio = Precio;
        this.QREntradas = QREntradas;
        this.usuario = usuario;
        this.funcion = funcion;
    }
}