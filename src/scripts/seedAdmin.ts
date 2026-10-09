import { Usuario, RolUsuario } from '../usuario/usuario.entity.js'
import bcrypt from 'bcrypt'
import { orm } from '../shared/db/orm.js'

async function seedAdmin() {
  // Conectamos a la base de datos
  await orm.connect()

  // Creamos un EntityManager aislado para el script
  const em = orm.em.fork()

  const email = 'admin@test.com'

  // Verificar si ya existe
  const existe = await em.findOne(Usuario, { EmailUsuario: email })
  if (existe) {
    console.log(` El usuario ${email} ya existe (rol: ${existe.rol})`)
    await orm.close()
    return
  }
  // Hashear contraseña
  const hash = await bcrypt.hash('admin123', 10)

  // Crear admin
  const admin = new Usuario(
    new Date('2000-01-01'),
    email,
    hash,
    RolUsuario.ADMIN
  )

  em.persist(admin)
  await em.flush()

  console.log(`Admin creado: ${email} / admin123`)

  await orm.close()
}
seedAdmin().catch(console.error)