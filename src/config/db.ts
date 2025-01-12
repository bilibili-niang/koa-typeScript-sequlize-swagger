import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import User from '@/schema/user'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
})

//实例化对象
// @ts-ignore
const seq = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME, process.env.DATABASE_PASSWORD, {
  // host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  port: Number(process.env.DATABASE_PORT),
  // 设置字符集为utf8mb4
  // charset: 'utf8mb4',
  logging: true,
  models: [User]
})

console.log('Database Name:', process.env.DATABASE_NAME)
console.log('User Name:', process.env.USER_NAME)
console.log('Database Password:', process.env.DATABASE_PASSWORD)
console.log('Database Port:', process.env.DATABASE_PORT)
console.log('Database Host:', process.env.DATABASE_HOST)
;(async () => {
  try {
    await seq.sync() // 这将会根据模型定义创建或更新表结构
    console.log('Database & tables created!')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

export default seq

