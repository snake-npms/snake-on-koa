const fs = require('fs')
const nunjucks = require('nunjucks')
module.exports = {
  readWriteFile(readFrom, writeTo, replaceObj) {
    fs.writeFileSync(writeTo, nunjucks.renderString(fs.readFileSync(readFrom, "utf8"), replaceObj).replace(/^\s*$(?:\r\n?|\n)/gm, ''), "utf8")
  }
}