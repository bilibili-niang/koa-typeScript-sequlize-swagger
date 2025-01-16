import {
  body,
  query,
  request,
  summary,
  swaggerClass,
  swaggerProperty,
  tags
} from
    'koa-swagger-decorator'

// 如果需要描述类本身（包括静态成员），则可以这样定义：
export interface IUserTypeConstructor {
  swaggerDocument?:object
}

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


@swaggerClass()
export class deleteUserQueryType {
  id: { type: 'number', required: true, description: '用户id', example: 1 }
}