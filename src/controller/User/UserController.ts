import { body, query, request, summary, swaggerClass, swaggerProperty, tags } from 'koa-swagger-decorator'
import { ctxBodySpecification } from '@/utils'

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
      msg:'开发测试中'
    })
  }

}

export default UserController