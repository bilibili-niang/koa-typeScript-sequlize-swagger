import Router from 'koa-router'
import TextControllerEle from '@/controller/Test'

const router = new Router({
  prefix: '/test'
})

router.post('/writeToLog',TextControllerEle.getTestLog)

module.exports=router
