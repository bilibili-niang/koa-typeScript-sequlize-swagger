import { body, query, request, summary, swaggerClass, swaggerProperty, tags } from 'koa-swagger-decorator'


@swaggerClass()
export class writeToLogType {
  @swaggerProperty({ type: 'string', required: false, description: '你想要写入info的字段' }) info: string = ''
  @swaggerProperty({ type: 'string', required: false, description: '你想要写入warn的字段' }) warn: string = ''
  // ...此处可以可以继续添加其他字段
}
