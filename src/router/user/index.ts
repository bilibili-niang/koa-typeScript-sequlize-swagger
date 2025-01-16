/*
* user router
* */
import Router from 'koa-router'
import UserControllerEle from '@/controller/User'
import { createUserType, } from '@/controller/User/type'
import { createVerificationMiddleware } from '@/utils/factory'

const router = new Router({
  prefix: '/user',
})

router.get('/userList', UserControllerEle.getUserList)

/*
* 这里传入了 createUserType ,会通过 createVerificationMiddleware 构建一个对 ctx.request.body,ctx.request.query 的参数校验,如果不通过,这里会拦截
* */
router.post('/create', createVerificationMiddleware(createUserType), UserControllerEle.createUser)

router.delete('/deleteUser', UserControllerEle.deleteUser)

module.exports = router
