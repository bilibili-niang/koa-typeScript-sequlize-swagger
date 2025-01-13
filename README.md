> [koa-typeScript-sequlize-swagger github地址](https://github.com/bilibili-niang/koa-typeScript-sequlize-swagger),欢迎点点`Star`

> [koa-typeScript-sequlize-swagger npm地址(感觉没必要发布到npm,下载下来是在node_modules中)](https://www.npmjs.com/package/koa-typescript-sequlize-swagger)

#### 介绍
基于`koa`,`ts`,`log4js`,`sequlize`的后端模板.自己的项目写了几个,但是后端总不能每次都一次次搭建出来吧,然后参考目前公司的后端功能,和别人的`nodejs`下`koa`的使用,配置了一个后端的基本框架,只能说够用,后续的更新也是会继续的.

#### 使用

> github clone
```shell
git clone https://github.com/bilibili-niang/koa-typeScript-sequlize-swagger.git
```

#### swagger配置和使用

> 为了方便后续接口的维护,你可以在项目启动后网页端直接看到所有路由  
或者你可以将路由导入到`apiFox`中

- 需要在`Controller`中配置

该项目中中达到Controller代码的逻辑:  
`router`->`middleware`->`Controller`
例如下面文件到达`Controller`的逻辑:  

> 导出的路由文件  

`D:\koa-typeScript-sequlize-swagger\src\router\user\index.ts`:  
```ts
import Router from 'koa-router'
import UserControllerEle from '@/controller/User'

const router = new Router({
  prefix: '/user'
})

router.post('/create',UserControllerEle.createUser)

module .exports= router
```

> 创建一个Controller实例并导出

`D:\koa-typeScript-sequlize-swagger\src\controller\User\index.ts`:  
```ts
import UserController from './UserController'

export default new UserController()
```
> Controller的类

`D:\koa-typeScript-sequlize-swagger\src\controller\User\UserController.ts`:  
```ts
import { body, query, request, summary, swaggerClass, swaggerProperty, tags } from 'koa-swagger-decorator'
// 自定义校验,这里无需说明
import { checkDesign, ctxBodySpecification } from '@/utils'
import { createUserType } from './type'

@swaggerClass()
class UserController {
  // 接口的文档定义
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
        ctx.body = ctxBodySpecification({
          success: false,
          msg: err.message
        })
      })
  }
}

export default UserController
```
在项目启动时,它会自动生成swagger的网页  
[项目启动后的swagger地址](http://localhost:3000/swagger-html)

#### .env配置
> 由于开发环境和线上环境等的配置不同,项目中默认配置了`本地开发`和`普通开发`的配置

`.env.development`,`.env`,分别启动他们的命令在`package.json`中定义即可
```json
{
  "scripts": {
    "devForLocal": "dotenv -e .env.development nodemon ./src/main.ts",
    "dev": "dotenv -e .env nodemon ./src/main.ts",
    "commit": "git-cz"
  }
}
```
> 默认配置:  
```.env
PROJECT_NAME=后端接口
PORT=3000
# 数据库配置
DATABASE_NAME=mydb
USER_NAME=root
DATABASE_PASSWORD=123456
DATABASE_PORT=3306
DATABASE_HOST=127.0.0.1
```














