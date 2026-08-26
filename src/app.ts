import express from 'express';        
import { salarouter } from './sala/sala.routes.js'

const app = express();
app.use(express.json())

// app.use('/', (req, res) => {
//    res.send('Ayudaaaa')
// }); 

app.use('/api/sala', salarouter)


 
//avisa que la ruta no existe
app.use ((_, res) => { 
    return res.status(404).send({ message: 'Ruta no encontrada' })
} )


//Avisa que funciona (?)
app.listen(3001, () => { 
    console.log('Server is running on port 3001')}
)
