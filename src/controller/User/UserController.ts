import { body, query, request, summary, swaggerClass, swaggerProperty, tags } from 'koa-swagger-decorator'
import { checkDesign, ctxBodySpecification } from '@/utils'
import { createUserType } from './type'


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
  async createUser(ctx, next) {
    const paramType = new createUserType()

    // 获取目标参数
    checkDesign(ctx.request.body, paramType as any)

      .then(({ result: params }) => {
        ctx.body = ctxBodySpecification({
          success: true,
          msg: '开发测试中'
        })

      })
      .catch((err) => {
        console.log('err:')
        console.log(err)
        ctx.body = ctxBodySpecification({
          success: false,
          msg: err.message
        })
      })
  }
}

export default UserController