
export class Sala {
    constructor(
        public NumSala: number,
        public Capacidad: number,
        public TipoPantalla: string,
        public TipoAsientos: string
    ) {}
}

//insert data
//db.salas.insertOne({
//    NumSala: 2,
//    Capacidad: 100,
//    TipoPantalla: "IMAX",
//    TipoAsientos: "Reclinables",

//})


//show dbs
//use cine
//show collections
//db.salas.find()