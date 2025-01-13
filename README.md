[中文](#zh),[English](#en)

---
##### zh

> [koa-typeScript-sequlize-swagger github地址](https://github.com/bilibili-niang/koa-typeScript-sequlize-swagger),欢迎点点`Star`

> [koa-typeScript-sequlize-swagger npm地址(感觉没必要发布到npm,下载下来是在node_modules中)](https://www.npmjs.com/package/koa-typescript-sequlize-swagger)

#### 介绍
基于`koa`,`ts`,`log4js`,`sequlize`的后端模板.自己的项目写了几个,但是后端总不能每次都一次次搭建出来吧,然后参考目前公司的后端功能,和别人的`nodejs`下`koa`的使用,配置了一个后端的基本框架,只能说够用,后续的更新也是会继续的.

#### 使用

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

#### log4js

> [log4js地址](https://github.com/log4js-node/log4js-node)

> 项目中支持将log输出到文件

目前支持的输出等级:
```ts
export {
  trace,
  debug,
  info,
  warn,
  error,
  fatal
}
```
具体的配置可以查看:`D:\koa-typeScript-sequlize-swagger\src\config\log4j.ts`,  
项目启动时,它会创建log文件夹(`D:\koa-typeScript-sequlize-swagger\src\logs`)以及对应的log文件

#### sequlize数据库连接 

> [sequelize-typescript地址](https://github.com/sequelize/sequelize-typescript)

> 很多库支持连接数据库,这里只是其中一种

> 创建数据库连接并初始化Model:  

`D:\koa-typeScript-sequlize-swagger\src\config\db.ts`
```ts
import { Sequelize } from 'sequelize-typescript'
import User from '@/schema/user'
import {env} from '@/main'

//实例化对象
const seq = new Sequelize(env.DATABASE_NAME, env.USER_NAME, env.DATABASE_PASSWORD, {
  dialect: 'mysql',
  port: Number(env.DATABASE_PORT),
  logging: true,
  models: [User]
})
// 初始化model
;(async () => {
  try {
    await seq.sync() // 这将会根据模型定义创建或更新表结构
    console.log('Database & tables created!')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

export default seq
```
> 定义一张表:

`D:\koa-typeScript-sequlize-swagger\src\schema\user\index.ts`:
```ts
import { Column, DataType, Length, Table } from 'sequelize-typescript'
import BaseModel from '@/schema/baseModal'

@Table({ tableName: 'user' })
export default class User extends BaseModel {
  @Length({
    min: 2,
    max: 10,
    msg: 'userName must between 2 to 10 characters'
  })
  @Column({
    type: DataType.STRING,
    comment: '用户名称'
  })
  userName: string
  @Column({
    type: DataType.STRING,
    comment: '密码'
  })
  password: string
}
```

---

后续会有更新,文档更新较慢

---
##### en

> [koa-typeScript-sequlize-swagger github address](https://github.com/bilibili-niang/koa-typeScript-sequlize-swagger), welcome to click `Star`

> [koa-typeScript-sequlize-swagger npm address (I feel it is not necessary to publish to npm, the download is in node_modules)](https://www.npmjs.com/package/koa-typescript-sequlize-swagger)

#### Introduction
Backend template based on `koa`, `ts`, `log4js`, `sequlize`. I have written several projects of my own, but the backend can't be built again and again every time. Then, referring to the current company's backend functions and the use of `koa` under `nodejs` by others, I configured a basic backend framework, which can only be said to be enough, and subsequent updates will continue.

#### Usage

```shell
git clone https://github.com/bilibili-niang/koa-typeScript-sequlize-swagger.git
```

#### swagger configuration and use

> To facilitate the maintenance of subsequent interfaces, you can directly see all routes on the web page after the project is started
Or you can import routes into `apiFox`

- Need to be configured in `Controller`

The logic of reaching the Controller code in this project:
`router`->`middleware`->`Controller`
For example, the logic of reaching the `Controller` in the following file:

> Exported route file

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

> Create a Controller instance and export it

`D:\koa-typeScript-sequlize-swagger\src\controller\User\index.ts`:
```ts
import UserController from './UserController'

export default new UserController()
```
> Controller class

`D:\koa-typeScript-sequlize-swagger\src\controller\User\UserController.ts`:
```ts
import { body, query, request, summary, swaggerClass, swaggerProperty, tags } from 'koa-swagger-decorator'
// Custom validation, no need to explain here
import { checkDesign, ctxBodySpecification } from '@/utils'
import { createUserType } from './type'

@swaggerClass()
class UserController {
// Document definition of interface
@request('post', '/user/create')
@tags(['User', 'Create'])
@summary('Create user')
@body((createUserType as any).swaggerDocument)
async createUser(ctx, next) {
const paramType = new createUserType()
// Get target parameters
checkDesign(ctx.request.body, paramType as any)
.then(({ result: params }) => {
ctx.body = ctxBodySpecification({
success: true,
msg: 'Development and testing'
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
When the project starts, it will automatically generate the swagger webpage
[swagger address after project startup](http://localhost:3000/swagger-html)

#### .env configuration
> Due to the different configurations of the development environment and the online environment, the project has the default configurations of `local development` and `normal development`

`.env.development`, `.env`, start their commands respectively and define them in `package.json`
```json
{
"scripts": {
"devForLocal": "dotenv -e .env.development nodemon ./src/main.ts",
"dev": "dotenv -e .env nodemon ./src/main.ts",
"commit": "git-cz"
}
}
```
> Default configuration:
```.env
PROJECT_NAME=backend interface
PORT=3000
# Database configuration
DATABASE_NAME=mydb
USER_NAME=root
DATABASE_PASSWORD=123456
DATABASE_PORT=3306
DATABASE_HOST=127.0.0.1
```

#### log4js

> [log4js address](https://github.com/log4js-node/log4js-node)

> The project supports log output to files

Currently supported output levels:
```ts
export {
trace,
debug,
info,
warn,
error,
fatal
}
```
For specific configuration, please see:`D:\koa-typeScript-sequlize-swagger\src\config\log4j.ts`,
When the project starts, it will create a log folder (`D:\koa-typeScript-sequlize-swagger\src\logs`) and the corresponding log file

#### sequlize database connection

> [sequelize-typescript address](https://github.com/sequelize/sequelize-typescript)

> Many libraries support connecting to databases, here is just one of them

> Create a database connection and initialize the Model:

`D:\koa-typeScript-sequlize-swagger\src\config\db.ts`
```ts
import { Sequelize } from 'sequelize-typescript'
import User from '@/schema/user'
import {env} from '@/main'

//Instantiate objects
const seq = new Sequelize(env.DATABASE_NAME, env.USER_NAME, env.DATABASE_PASSWORD, {
dialect: 'mysql',
port: Number(env.DATABASE_PORT),
logging: true,
models: [User]
})
// Initialize model
;(async () => {
try {
await seq.sync() // This will create or update the table structure according to the model definition
console.log('Database & tables created!')
} catch (error) {
console.error('Unable to connect to the database:', error)
}
})()

export default seq
```
> Define a table:

`D:\koa-typeScript-sequlize-swagger\src\schema\user\index.ts`:
```ts
import { Column, DataType, Length, Table } from 'sequelize-typescript'
import BaseModel from '@/schema/baseModal'

@Table({ tableName: 'user' })
export default class User extends BaseModel {
@Length({
min: 2,
max: 10,
msg: 'userName must between 2 to 10 characters'
})
@Column({
type: DataType.STRING,
comment: 'User name'
})
userName: string
@Column({
type: DataType.STRING,
comment: 'Password'
})
password: string
}
```

---

There will be updates later, the document update is slow