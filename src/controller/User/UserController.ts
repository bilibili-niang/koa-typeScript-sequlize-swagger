import seq from '@/config/db'
import { body, query, request, summary, swaggerClass, tags } from 'koa-swagger-decorator'
import { createVerificationMiddleware, ctxBodySpecification, paginationMiddleware } from '@/utils'
import { createUserType, deleteUserQueryType } from './type'
import User from '@/schema/user'

// 仅仅是为了导入seq
seq

@swaggerClass()
class UserController {
  @request('get', '/user/userList')
  @tags(['用户', '列表'])
  @summary('获取用户列表')
  @query({
    current: { type: 'number', required: true, description: '当前第几页' },
    page: { type: 'number', required: true, description: '页码' },
    size: { type: 'number', required: true, description: '每页数量' },
  })
  async getUserList(ctx: any) {
    await paginationMiddleware(ctx, User, '查询用户列表')
  }

  @request('post', '/user/create')
  @tags(['用户', '创建'])
  @summary('创建用户')
  @body((createUserType as any).swaggerDocument)
  async createUser(ctx, next) {
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

  @request('delete', '/user/deleteUser')
  @tags(['用户', '删除'])
  @summary('通过id删除用户')
  @query({
    id: { type: 'string', required: true, description: '用户id', example: 'abc' }
  })
  async deleteUser(ctx: any) {
    const res = await User.destroy({
      where: {
        id: ctx.request.query.id
      }
    })

    if (res === 0) {
      ctx.body = ctxBodySpecification({
        msg: '删除用户失败,并不存在该用户',
        data: {}
      })
    } else {
      ctx.body = ctxBodySpecification({
        success: true,
        code: 200,
        msg: '删除用户成功',
        data: res
      })
    }
  }
}

export default UserController