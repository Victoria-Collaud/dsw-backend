
//import { MikroORM } from '@mikro-orm/core'
//import { MySqlDriver } from '@mikro-orm/mysql'
//import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

//export const orm = await MikroORM.init({
//  entities: ['dist/**/*.entity.js'],
//  entitiesTs: ['src/**/*.entity.ts'],
//  dbName: 'cine',
//  driver: MySqlDriver,
//  clientUrl: 'mysql://dsw:dsw@localhost:3306/cine',
//  highlighter: new SqlHighlighter(),
//  debug: true,
//  schemaGenerator: {
    //never in production
//    disableForeignKeys: true,
//    createForeignKeyConstraints: true,
//    ignoreSchema: [],
//  },
//})

//export const syncSchema = async () => {
//  const generator = orm.schema
  /*   
  await generator.dropSchema()
  await generator.createSchema()

  usar este ? export const syncSchema = async () => {
  await orm.schema.dropSchema()
  await orm.schema.createSchema()
} o esto import { MikroORM } from '@mikro-orm/mysql'
  */
//  await generator.update()
//}


import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: MySqlDriver,
  // Leemos las variables de entorno que Railway nos provee
  dbName: process.env.MYSQLDATABASE || 'cine',
  host: process.env.MYSQLHOST || 'localhost',
  port: Number(process.env.MYSQLPORT) || 3306,
  user: process.env.MYSQLUSER || 'dsw',
  password: process.env.MYSQLPASSWORD || 'dsw',
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.schema;
  await generator.update();
};