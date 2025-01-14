import seq from '@/config/db'
import { body, query, request, summary, swaggerClass, swaggerProperty, tags } from 'koa-swagger-decorator'
import { ctxBodySpecification } from '@/utils'
import { createUserType } from './type'
import User from '@/schema/user'

// 仅仅是为了导入seq
console.log(seq)

@swaggerClass()
class UserController {

  @request('get', '/user/userList')
  @tags(['用户', '测试'])
  @summary('获取用户列表')
  @query({
    page: { type: 'number', required: true, description: '页码' },
    pageSize: { type: 'number', required: true, description: '每页数量' },
  })
  async getUserList(ctx: any) {
    const { page, pageSize } = ctx.query

    ctx.body = ctxBodySpecification({
      success: true,
      msg: '开发测试中'
    })
  }

  @request('post', '/user/create')
  @tags(['用户', '创建'])
  @summary('创建用户')
  @body((createUserType as any).swaggerDocument)
  async createUser(ctx) {
    const bodyParams = ctx.request.body
    await User.create(bodyParams)
      .then((res: any) => {
        ctx.body = ctxBodySpecification({
          success: true,
          code: 200,
          msg: '创建用户成功',
          data: res.dataValues
        })
      })
      .catch(e => {
        ctx.body = ctxBodySpecification({
          success: false,
          code: 500,
          msg: '创建用户失败',
          data: e
        })
      })
  }
}

export default UserController