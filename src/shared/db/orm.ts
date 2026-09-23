import { MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'cine',
  driver: MySqlDriver,
  clientUrl: 'mysql://dsw:dsw@localhost:3306/cine',
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    //never in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
})

export const syncSchema = async () => {
  const generator = orm.schema
  /*   
  await generator.dropSchema()
  await generator.createSchema()

  usar este ? export const syncSchema = async () => {
  await orm.schema.dropSchema()
  await orm.schema.createSchema()
} o esto import { MikroORM } from '@mikro-orm/mysql'
  */
  await generator.update()
}