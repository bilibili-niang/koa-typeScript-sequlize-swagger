import {
  Column,
  DataType,
  HasMany,
  Model,
  IsEmail,
  Length,
  Table,
  Unique,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript'


class BaseModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    comment: '自增ID'
  })
  declare id: bigint

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