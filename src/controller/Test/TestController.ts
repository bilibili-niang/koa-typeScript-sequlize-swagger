import { body, query, request, summary, swaggerClass, swaggerProperty, tags } from 'koa-swagger-decorator'
import { writeToLogType } from '@/controller/Test/type'
import { info, warn } from '@/config/log4j'
import { ctxBodySpecification } from '@/utils'

@swaggerClass()
class TestController {

  // 测试接口,写入log
  @request('post', '/test/writeToLog')
  @summary('写入log文件')
  @tags(['测试'])
  @body((writeToLogType as any).swaggerDocument)
  async getTestLog(ctx) {

    // 获取swagger类定义的参数
    const paramType = new writeToLogType()

    // 获取目标参数
    const params = Object.assign(paramType, ctx.request.body)

    if (params.info) {
      info(params.info)
    }

    if (params.warn) {
      warn(params.warn)
    }

    ctx.body = ctxBodySpecification({
      code: 200,
      success: true,
      msg: '写入log成功'
    })
  }
}

export default TestController