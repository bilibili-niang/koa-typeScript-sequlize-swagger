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

/*
User.init({
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})*/

/*
seq.addModels([User])

// 如果你需要显式地调用 init 方法，可以这样做：
User.init({
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: '用户ID'
  },
  userName: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 10],
        msg: 'userName must between 2 to 10 characters'
      }
    },
    comment: '用户名称'
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
    comment: '密码'
  }
}, {
  sequelize: seq, // 这个模型关联的 Sequelize 实例
  tableName: 'user', // 表名
  modelName: 'User' // 模型名
})*/
