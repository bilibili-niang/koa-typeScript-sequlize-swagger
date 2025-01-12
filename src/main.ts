import { addAliases } from 'module-alias'

// 配置路径别名,需要在项目的入口
addAliases({
  '@': __dirname
})

import dotenv from "dotenv"
dotenv.config()
import app from './app'
import { info } from '@/config/log4j'
import path from 'path'

app.listen(Number(process.env.PORT), () => {
  info(`Server is running at http://localhost:${process.env.PORT}`)
  console.log(`Server is running at http://localhost:${process.env.PORT}`)
  console.log(`swaggerDoc is running at http://localhost:${process.env.PORT}/swagger-html`)
})
const projectPath=path.join(__dirname,'./')

export {
  projectPath
}