// swagger的配置
import { SwaggerRouter } from 'koa-swagger-decorator'
import path from 'path'
import * as process from 'node:process'

const swaggerDoc = new SwaggerRouter()

swaggerDoc.swagger({
  title: process.env.PROJECT_NAME,
  description: 'API DOC',
  version: '1.0'
})

// 查找对应目录下的routes文件夹
swaggerDoc.mapDir(path.resolve(__dirname, '../controller/'))


export default swaggerDoc