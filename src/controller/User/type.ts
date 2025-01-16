import { z } from 'koa-swagger-decorator'

const CreateUserReq = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
})

const CreateUserRes = z.object({
  id: z.string().nullable(),
  message: z.string().nullable(),
})

export type ICreateUserRes = z.infer<typeof CreateUserRes>;
export type ICreateUserReq = z.infer<typeof CreateUserReq>;
export {
  CreateUserRes,
  CreateUserReq
}