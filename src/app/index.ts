// koa的挂载和静态资源开放等
import koa from 'koa'
import swaggerDoc from '@/config/swagger'
import indexRouter from '@/router/index'
import bodyParser from 'koa-bodyparser'
import path from 'path'

import { validate } from '@/utils'

import staticFiles from 'koa-static'

const app = new koa()

// 跨域
app
  .use(bodyParser())
  // @ts-ignore
  .use(validate)
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type')
    ctx.set('Access-Control-Allow-Methods', 'POST')
    await next()
  })
  //开放html模板的静态目录,你可以把打包后的html文件放到这个目录下
  .use(staticFiles(path.join(__dirname, '../static/views/'), { extensions: ['html'] }))
  .use(indexRouter.routes())
  .use(swaggerDoc.routes())
  .on('error', (ctx) => {
    ctx.body = {
      code: 500,
      msg: '你遇到了一个错误'
    }
  })

export default app