import { SwaggerRouter } from 'koa-swagger-decorator'
import { UserController } from '@/controller/User'


const router = new SwaggerRouter({
  spec: {
    info: {
      title: "Example API Server",
      version: "v1.0",
    },
  },
  swaggerHtmlEndpoint: '/swagger-html',
  swaggerJsonEndpoint: '/swagger-json',
})
router.prefix('/test')

router.swagger()

router
  .applyRoute(UserController)

export {
  router
}