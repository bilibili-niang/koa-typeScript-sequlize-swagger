import { SwaggerRouter } from 'koa-swagger-decorator'
// import { SwaggerRouter } from 'koa-swagger-decorator-vvv'
import { UserController } from '@/controller/User'
import * as process from 'node:process'


const router = new SwaggerRouter({
  spec: {
    info: {
      title: process.env.PROJECT_NAME,
      version: 'v1.0',
    },
  },
  swaggerHtmlEndpoint: '/swagger-html',
  swaggerJsonEndpoint: '/swagger-json',
})
router.swagger()

router
  .applyRoute(UserController)

export {
  router
}