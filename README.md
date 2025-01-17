[中文](#zh),[English](#en)


---
##### zh


#### 鸣谢:

[koa-swagger-decorator](https://github.com/Cody2333/koa-swagger-decorator),[sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)等等...

> [koa-typeScript-sequlize-swagger github地址](https://github.com/bilibili-niang/koa-typeScript-sequlize-swagger),欢迎点点`Star`

> [koa-typeScript-sequlize-swagger npm地址(感觉没必要发布到npm,下载下来是在node_modules中)](https://www.npmjs.com/package/koa-typescript-sequlize-swagger)

#### 介绍
基于`koa`,`ts`,`log4js`,`sequlize`的后端模板.自己的项目写了几个,
参考后端应有的一些功能,和别人的`nodejs`下`koa`的使用,配置了一个后端的基本框架,只能说够用,后续的更新也是会继续的.

#### 使用

```shell
git clone https://github.com/bilibili-niang/koa-typeScript-sequlize-swagger.git
```

#### koa-swagger-decorator配置和使用

> 为了方便后续接口的维护,你可以在项目启动后网页端直接看到所有路由  
或者你可以将路由导入到`apiFox`中,要注意该项目在npm上有两个version:`latest`和`next`,两者相差很大,模板中使用的是`next`


- `koa-swagger-decorator`是支持数据的校验,模板中有一些例子,但更多的使用,请访问[文档](https://github.com/Cody2333/koa-swagger-decorator)
- 模板中带了一些简单的新增,查询,删除操作
- 需要使用`SwaggerRouter`代替koa的路由,像是下面一个简单的配置:

`D:\koa-typeScript-sequlize-swagger\src\router\user\index.ts`:
```ts
import { SwaggerRouter } from 'koa-swagger-decorator'
import { UserController } from '@/controller/User'
import { swaggerSpec } from '@/config/swagger'

const router = new SwaggerRouter({
  spec: {
    info: {
      // 配置在.env文件中
      title: process.env.PROJECT_NAME,
      version: 'v1.0',
    },
  }
})
router.swagger()

// 接受一个路由实例
router
  .applyRoute(UserController)

module.exports = router
```
`D:\koa-typeScript-sequlize-swagger\src\controller\User\index.ts`:
```ts
import { Context } from 'koa'
import { body, middlewares, responses, routeConfig } from 'koa-swagger-decorator'
import {
  CreateUserReq,
  CreateUserRes,
  DeleteUserQuery,
  DeleteUserRes,
  IDeleteUserQuery,
} from './type'
import { ParsedArgs, z } from 'koa-swagger-decorator'
import { ICreateUserReq } from '@/controller/User/type'
import User from '@/schema/user'
import { ctxBody, deleteByIdMiddleware, paginationMiddleware } from '@/utils'
import { paginationQuery } from '@/controller/common/queryType'

class UserController {
  @routeConfig({
    method: 'post',
    path: '/user/create',
    summary: '创建用户',
    tags: ['用户'],
  })
  @body(CreateUserReq)
  @responses(CreateUserRes)
  @middlewares([
    async (ctx: Context, next: any) => {
      // 可以对ctx进行操作,然后放行
      await next()
    }
  ])
  async CreateUser(ctx: Context, args: ParsedArgs<ICreateUserReq>) {
    await User.create(args.body)
      .then((res: any) => {
        ctx.body = ctxBody({
          success: true,
          code: 200,
          msg: '创建用户成功',
          data: res.dataValues
        })
      })
      .catch(e => {
        ctx.body = ctxBody({
          success: false,
          code: 500,
          msg: '创建用户失败',
          data: e
        })
      })
  }

  @routeConfig({
    method: 'get',
    path: '/user/list',
    summary: '用户列表',
    tags: ['用户'],
    request: {
      query: paginationQuery()
    }
  })
  @responses(CreateUserRes)
  async getUserList(ctx: Context, args: ParsedArgs<ICreateUserReq>) {
    await paginationMiddleware(ctx, User, '查询用户列表')
  }

  @routeConfig({
    method: 'delete',
    path: '/user/delete',
    summary: '删除指定用户',
    tags: ['用户'],
    request: {
      query: DeleteUserQuery
    }
  })
  @responses(DeleteUserRes)
  async deleteUser(ctx: Context, args: ParsedArgs<IDeleteUserQuery>) {
    await deleteByIdMiddleware(ctx, User, '用户')
  }
}

export { UserController }
```
- 这里你在`koa-swagger-decorator`的源码中可以发现,生成swagger路由和生成api是相关的,注解和Controller的实现是通过唯一键绑定,但大部分代码我看不懂


> 模板中是把所有的路由放在`router`的子文件夹下,并在router/index.ts中导出  

`D:\koa-typeScript-sequlize-swagger\src\router\user\index.ts`:  
```ts
import fs from 'fs'
// 这里使用koa-router的路由即可
import Router from 'koa-router'

const indexRouter = new Router()

// 获取当前目录下所有的文件，排除当前文件
const files = fs.readdirSync(__dirname)
  .filter(file => file !== 'index.ts')
files.forEach(file => {
  const routeModule = require(`./${file}`)
  if (routeModule.routes) {
    indexRouter.use(routeModule.routes())
  }
})

export default indexRouter
```

[项目启动后的swagger地址](http://localhost:3000/swagger-html)

#### .env配置
> 由于开发环境和线上环境等的配置不同,项目中默认配置了`本地开发`和`普通开发`的配置

`.env.development`,`.env`,分别启动他们的命令在`package.json`中定义即可
```json
{
  "scripts": {
    "devLocal": "dotenv -e .env.development nodemon ./src/main.ts",
    "dev": "dotenv -e .env nodemon ./src/main.ts",
    "commit": "git-cz"
  }
}
```
> 默认配置:  
```env
# swagger的标题配置
PROJECT_NAME=后端接口,本地测试环境
# 项目的端口配置
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
import * as process from 'node:process'

//实例化对象
const seq = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME, process.env.DATABASE_PASSWORD, {
    dialect: 'mysql',
    port: Number(process.env.DATABASE_PORT),
    logging: false,
    models: [User]
  })

;(async () => {
  try {
    // 这将会根据模型定义创建或更新表结构
    await seq.sync()
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
import { Column, DataType, Table, Length } from 'sequelize-typescript'
import BaseModel from '@/schema/baseModal'

@Table({
  tableName: 'user',
  paranoid: true
  // 启用软删除
})
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
  declare userName: string
  @Column({
    type: DataType.STRING,
    comment: '密码'
  })
  declare password: string
}
```
`BaseModel`:
```ts
import { v4 as uuidv4 } from 'uuid'
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript'

class BaseModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID, // 使用 UUID 类型
    defaultValue: () => uuidv4().replace(/-/g, ''),
    primaryKey: true, // 设置为主键
    allowNull: false, // 不允许为空
  })
  declare id: string

  @CreatedAt
  @Column({
    type: DataType.DATE,
    comment: '创建时间'
  })
  declare createdAt: Date | null

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    comment: '修改时间'
  })
  declare updatedAt: Date | null

  @DeletedAt
  @Column({
    type: DataType.DATE,
    comment: '删除时间'
  })
  declare deletedAt: Date | null
}

export default BaseModel
```
---

后续会有更新,文档更新较慢

---
##### en

#### Acknowledgments:

[koa-swagger-decorator](https://github.com/Cody2333/koa-swagger-decorator), [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript), and others...

> [GitHub repository for koa-typeScript-sequlize-swagger](https://github.com/bilibili-niang/koa-typeScript-sequlize-swagger). Feel free to give it a `Star`.

> [NPM page for koa-typeScript-sequlize-swagger (though publishing it on NPM may not be necessary, as downloading it will place it in node_modules)](https://www.npmjs.com/package/koa-typescript-sequlize-swagger).

#### Introduction
This is a backend template based on `Koa`, `TypeScript`, `log4js`, and `Sequelize`. I have developed several projects using this framework, incorporating essential functionalities typically found in backend systems. Drawing inspiration from other implementations of Koa within the Node.js ecosystem, I have configured a basic framework that meets my needs. Future updates will continue to enhance its capabilities.

#### Usage

```shell
git clone https://github.com/bilibili-niang/koa-typeScript-sequlize-swagger.git
```

#### Configuration and Usage of koa-swagger-decorator

> To facilitate the maintenance of interfaces moving forward, you can view all routes directly through the web interface after starting the project. Alternatively, you can import these routes into `apiFox`. Please note that there are two versions available on NPM: `latest` and `next`, which differ significantly; this template utilizes the `next` version.

- The `koa-swagger-decorator` supports data validation. While some examples are included in this template, further usage details can be found in the [documentation](https://github.com/Cody2333/koa-swagger-decorator).
- This template includes simple operations for creating, querying, and deleting records.
- You need to use the `SwaggerRouter` instead of Koa's default routing mechanism. Below is an example configuration:

`D:\koa-typeScript-sequlize-swagger\src\router\user\index.ts`:
```ts
import { SwaggerRouter } from 'koa-swagger-decorator';
import { UserController } from '@/controller/User';
import { swaggerSpec } from '@/config/swagger';

const router = new SwaggerRouter({
  spec: {
    info: {
      // Configured in .env file
      title: process.env.PROJECT_NAME,
      version: 'v1.0',
    },
  }
});
router.swagger();

// Apply route instance
router.applyRoute(UserController);

module.exports = router;
```
`D:\koa-typeScript-sequlize-swaggger\src\controller\User\index.ts`:
```ts
import { Context } from 'koa';
import { body, middlewares, responses, routeConfig } from 'koa-swagger-decorator';
import {
  CreateUserReq,
  CreateUserRes,
  DeleteUserQuery,
  DeleteUserRes,
  IDeleteUserQuery,
} from './type';
import { ParsedArgs, z } from 'koa-swaggeer-decoraor';
import { ICreateUserReq } from '@/controller/User/type';
import User from '@/schema/user';
import { ctxBody, deleteByIdMiddleware,paginationMiddleware}from'@/utils'; 
// Additional code continues...
```

