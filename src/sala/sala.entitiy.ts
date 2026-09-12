import { ObjectId } from "mongodb";

export class Sala {
    constructor(
        public NumSala: number,
        public Capacidad: number,
        public TipoPantalla: string,
        public TipoAsientos: string,
        public  _id?: ObjectId,  
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