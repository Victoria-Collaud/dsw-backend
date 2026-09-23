import express from 'express';        
import { salarouter } from './sala/sala.routes.js'
import 'reflect-metadata'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'

const app = express();
app.use(express.json())

//luego de los middlewares base
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})
//antes de las rutas y middlewares de negocio
app.use('/api/salas', salarouter)


//avisa que la ruta no existe
app.use ((_, res) => { 
    return res.status(404).send({ message: 'Ruta no encontrada' })
} )

await syncSchema() //never in production

//Avisa que funciona (?)
app.listen(3001, () => { 
    console.log('Server is running on port 3001')}
)
