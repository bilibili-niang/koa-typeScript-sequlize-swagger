import { Context } from 'koa'
import { body, responses, routeConfig } from 'koa-swagger-decorator'
import {
  CreateUserReq,
  CreateUserRes,
} from './type'
import { ParsedArgs, z } from 'koa-swagger-decorator'
import { ICreateUserReq, ICreateUserRes } from '@/controller/User/type'

class UserController {

  @routeConfig({
    method: 'post',
    path: '/user/create',
    summary: '创建用户',
    tags: ['用户'],
  })
  @body(CreateUserReq)
  @responses(CreateUserRes)
  async CreateUser(ctx: Context, args: ParsedArgs<ICreateUserReq>) {

    console.log(args)

    ctx.body = { message: 'create', id: '123' } as ICreateUserRes
  }


  @routeConfig({
    method: 'get',
    path: '/user/list',
    summary: '用户列表',
    tags: ['用户'],
    request: {
      query: z.object({
        size: z.coerce.number().positive().default(10),
        page: z.coerce.number().positive().default(1),
        test: z.coerce.number().nullable()
      })
    }
  })
  @responses(CreateUserRes)
  async getUserList(ctx: Context, args: ParsedArgs<ICreateUserReq>) {

    console.log('args-------------------------')
    console.log(args)

    ctx.body = { message: 'create', id: '123' } as ICreateUserRes
  }

}

export { UserController }
