import { ctxBodySpecification } from '@/utils/ctxBodySpecification'
import { error } from '@/config/log4j'

/*
* 工厂函数接收一个包含 swagger 文档的类或对象
* 用来校验post传参是否完整和query
*/
// @ts-ignore
const createVerificationMiddleware = (swaggerClass: any) => {
  return async (ctx, next) => {

    // 合并请求体和查询参数
    const params = {
      ...ctx.request.body,
      ...ctx.request.query,
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

export {
  createVerificationMiddleware,
}