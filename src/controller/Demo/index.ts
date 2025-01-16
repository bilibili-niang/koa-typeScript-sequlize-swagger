import { middlewares, responses, routeConfig, z } from 'koa-swagger-decorator'


export class DemoController {
@routeConfig({
  path: '/demo',
  method: 'get',
  tags: ['DEMO'],
  request: {
    query: z.object({
      xxx: z.string().nullable().openapi({
        example: '110',
      }),
    }),
  },
})
}