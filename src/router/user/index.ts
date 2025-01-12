import Router from 'koa-router'
import UserControllerEle from '@/controller/User'

const router = new Router({
  prefix: '/user'
})

router.get('/userList',UserControllerEle.getUserList)

module .exports= router