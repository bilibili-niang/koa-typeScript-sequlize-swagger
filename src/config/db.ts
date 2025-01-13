import { Sequelize } from 'sequelize-typescript'
import User from '@/schema/user'
import {env} from '@/main'

//实例化对象
// @ts-ignore
const seq = new Sequelize(env.DATABASE_NAME, env.USER_NAME, env.DATABASE_PASSWORD, {
  // host: env.DATABASE_HOST,
  dialect: 'mysql',
  port: Number(env.DATABASE_PORT),
  // 设置字符集为utf8mb4
  // charset: 'utf8mb4',
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