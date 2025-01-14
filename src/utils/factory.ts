import { ctxBodySpecification } from '@/utils/ctxBodySpecification'
import { error } from '@/config/log4j'
import seq from '@/config/db'
import { toInteger } from 'lodash'
seq

/*
* 工厂函数接收一个包含 swagger 文档的类或对象
* 用来校验post传参是否完整和query
*/
// @ts-ignore
const createVerificationMiddleware = (swaggerClass: any) => {
  return async (ctx, next) => {

    // 调用此方法即可为接口添加默认分页参数
    const queryParams = Object.assign({ size: 10, current: 1, pages: 1 }, ctx.request.query)

    // 合并请求体和查询参数
    const params = {
      ...ctx.request.body,
      queryParams,
    }

    // 初始化错误消息数组
    const missingFields: string[] = []

    // 遍历 swagger 文档中的每个属性
    for (let key in swaggerClass.swaggerDocument) {
      const paramValue = params[key]
      const spec = swaggerClass.swaggerDocument[key]

      if (spec.required) {
        // 检查是否提供了该字段，并且不是空字符串或仅包含空白字符
        if (paramValue === undefined || String(paramValue).trim() === '') {
          // 如果是必填项且未提供有效值，则记录下来
          missingFields.push(spec.description)
        }
      }
    }

    // 检查是否有任何必填项缺失或无效
    if (missingFields.length > 0) {
      // 写入到error 的log中

      error(`url:${ctx.request.url},error:${missingFields.join(', ')},${JSON.stringify(ctx.request)}`)

      // 构建错误响应
      ctx.body = ctxBodySpecification({
        code: 400,
        msg: `以下字段为必填项且不能为空：${missingFields.join(', ')}`,
      })
      // 返回不再继续执行后续中间件
      return
    }

    // 如果所有验证都通过，则调用下一个中间件
    await next()
  }
}

/*
* 构建一个分页查询
* */
const paginationMiddleware = async (ctx: any, model: any, msg?: string) => {
  const queryParams = Object.assign({ size: 10, current: 1, page: 1 }, ctx.request.query)

  // 执行分页查询
  await model.findAndCountAll({
    limit: toInteger(queryParams.size),
    offset: toInteger((queryParams.current - 1) * queryParams.size),
  })
    .then(res => {
      console.log(res)
      ctx.body = ctxBodySpecification({
        success: true,
        code: 200,
        msg: `查询${msg}成功`,
        data: res
      })
    })
    .catch(e => {
      ctx.body = ctxBodySpecification({
        success: false,
        code: 500,
        msg: `查询${msg}失败`,
        data: e
      })
    })

}


export {
  createVerificationMiddleware,
  paginationMiddleware
}


