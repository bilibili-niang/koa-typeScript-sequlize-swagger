import { Sequelize } from 'sequelize-typescript'
import User from '@/schema/user'
import * as process from 'node:process'

//实例化对象
// @ts-ignore
const seq = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME, process.env.DATABASE_PASSWORD, {
    dialect: 'mysql',
    port: Number(process.env.DATABASE_PORT),
    logging: true,
    models: [User]
  })

;(async () => {
  try {
    await seq.sync() // 这将会根据模型定义创建或更新表结构
    console.log('Database & tables created!')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

export default seq