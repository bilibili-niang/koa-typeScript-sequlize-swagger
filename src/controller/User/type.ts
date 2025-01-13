import {
  body,
  query,
  request,
  summary,
  swaggerClass,
  swaggerProperty, tags
} from
    'koa-swagger-decorator'


@swaggerClass()
export class createUserType {
  @swaggerProperty({
    type: 'string',
    required: true,
    description: '用户名'
  }) userName: string = ''
  @swaggerProperty({
    type: 'string',
    required: false,
    description: '密码'
  }) password: string = '123456'

}
