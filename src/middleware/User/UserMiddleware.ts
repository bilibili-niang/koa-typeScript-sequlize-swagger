import { createUserType, IUserTypeConstructor } from '@/controller/User/type'
import { ctxBodySpecification, verificationPost } from '@/utils'

export class UserMiddleware {

  async createUserVerification(ctx,swaggerClass:  any) {
    console.log('ctx---------------')
    console.log(ctx)

    console.log(swaggerClass.swaggerDocument)
    console.log(swaggerClass.swaggerDocument)

    ctx.body=ctxBodySpecification

    /*ctx.postValidate()
      .then(res=>{

      })*/

  }
}