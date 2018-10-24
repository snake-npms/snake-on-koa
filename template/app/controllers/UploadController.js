const path = require('path')
const fs = require('fs')
let ApplicationController = require('./ApplicationController')
class UploadController extends ApplicationController {
  constructor () {
    super({prefix: '/upload'})
    
    this.post('/', async (ctx) => {
      const file = ctx.request.files.file	// 获取上传文件
      const readerStream = fs.createReadStream(file.path)	// 创建可读流
      const ext = file.name.split('.').pop();		// 获取上传文件扩展名
      const filePath = `upload/${file.hash}.${ext}`
      const writeStream = fs.createWriteStream(path.join(process.cwd(), `public`, filePath))		// 创建可写流
      readerStream.pipe(writeStream)	// 可读流通过管道写入可写流
      return ctx.body = {file: filePath}
    })
  }
}
module.exports = UploadController