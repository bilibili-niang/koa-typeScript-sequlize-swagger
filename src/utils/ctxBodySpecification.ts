// 对返回的响应状态进行规范
/*
* 强制传入的数据返回指定的格式
* */
export const ctxBodySpecification = (requestBody:any) => {
  const hopeResult={
    code:500,
    msg:'响应失败辣',
    data:{},
    success:false
  }
  return Object.assign(hopeResult, requestBody)
}