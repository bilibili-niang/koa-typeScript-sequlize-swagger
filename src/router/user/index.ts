import Router from 'koa-router'
import UserControllerEle from '@/controller/User'
import UserMiddlewareEle from '@/middleware/User'
import { createUserType } from '@/controller/User/type'
import { createVerificationMiddleware } from '@/utils'

const router = new Router({
  prefix: '/user'
})

router.get('/userList', UserControllerEle.getUserList)

router.post('/create', createVerificationMiddleware(createUserType), UserControllerEle.createUser)

module.exports = router