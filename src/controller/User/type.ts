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

// 定义一个接口来描述 createUserType 类的结构
interface IUserType {
  userName: string;
  password?: string; // 注意这里的可选性（?）
  swaggerDocument?:object
}

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
