import express, { NextFunction, Request, Response } from 'express';
import{Sala} from './sala/sala.entitiy.js'
import { SalaRepository } from './sala/sala.repository.js'

const app = express();
app.use(express.json())

// app.use('/', (req, res) => {
//    res.send('Ayudaaaa')
// }); 

const repository = new SalaRepository()

const SalaInstances = [
    new Sala(
        1,
        100, 
        "2D", 
        "Reclinables"),]

function sanitizeSalaInput(req: Request, res: Response, next:NextFunction) {
    req.body.sanitizedInput = {
        NumSala: req.body.NumSala,
        Capacidad: req.body.Capacidad,
        TipoPantalla: req.body.TipoPantalla,
        TipoAsientos: req.body.TipoAsientos,        
        }

    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
      }
    })
next ()
}

//Crea sala       
app.post('/api/sala', sanitizeSalaInput, (req, res) => { 
    const input = req.body.sanitizedInput
    
    const Salainput = new Sala(
        input.NumSala, 
        input.Capacidad, 
        input.TipoPantalla, 
        input.TipoAsientos)
        
    const sala = repository.add(Salainput)
     return res.status(201).send({ message: 'Sala creada correctamente', data: sala }) 
} )



//Listado
app.get('/api/sala', (req, res) => {
    res.json({data: repository.findAll()})
} )

//Busca sala por numero
app.get('/api/sala/:NumSala', (req, res) => {
    const NumSala = req.params.NumSala
    const sala = repository.findOne({NumSala: Number(NumSala)})
if (!sala){
    return res.status(404).send({ message: 'La sala no existe' })
     }
     res.send({ data: sala }) })


//Busca y modifica sala totalmente
app.put('/api/sala/:NumSala',sanitizeSalaInput, (req, res) => { 
    req.body.sanitizedInput.NumSala = req.params.NumSala
    const sala =repository.update(req.body.sanitizedInput)  
    
    if (!sala) { 
       return res.status(404).send({ message: 'La sala no existe' } )
     }

    return res.status(200).send({ message: 'Sala actualizada correctamente', data: sala })
})


//Busca y modifica algunos aspectos de la sala 
app.patch('/api/sala/:NumSala',sanitizeSalaInput, (req, res) => { 
   
    req.body.sanitizedInput.NumSala = req.params.NumSala
    const sala =repository.update(req.body.sanitizedInput)  
    
    if (!sala) { 
       return res.status(404).send({ message: 'La sala no existe' } )
     }

    return res.status(200).send({ message: 'Sala actualizada correctamente', data: sala })
})

//Borra
app.delete('/api/sala/:NumSala', (req, res) => {
    const NumSala = req.params.NumSala
    const sala = repository.delete({NumSala: Number(NumSala)})
    
  if(!sala){
    res.status(404).send( {  message:'sala no encontrada' } )
  } else{
    res.status(200).send({message:'sala eliminada correctamente'})
  }
})

//avisa que la ruta no existe
app.use ((_, res) => { 
    return res.status(404).send({ message: 'Ruta no encontrada' })
} )


//Avisa que funciona (?)
app.listen(3001, () => { 
    console.log('Server is running on port 3001')}
)