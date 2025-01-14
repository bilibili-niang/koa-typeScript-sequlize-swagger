import { Column, DataType, Table, Model, BeforeCreate, Length } from 'sequelize-typescript'
import { v4 as uuidv4 } from 'uuid' // 导入用于生成 UUID 的库


@Table({ tableName: 'user' })
export default class User extends Model<any> {
  @Column({
    type: DataType.UUID, // 使用 UUID 类型
    defaultValue: DataType.UUIDV4, // 默认值为 UUIDv4
    primaryKey: true, // 设置为主键
    allowNull: false, // 不允许为空
  })
  declare id: string

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

  // 如果您想要确保每次创建新记录时都生成一个新的 UUID，可以使用钩子函数
  @BeforeCreate
  static generateUUID(instance: User) {
    if (!instance.id) {
      instance.id = uuidv4() // 手动设置 UUID
    }
  }
}