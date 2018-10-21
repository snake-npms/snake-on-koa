const fs = require('fs')
const nunjucks = require('nunjucks')
const promptly = require('promptly')
module.exports = {
  _readWriteFile(readFrom, writeTo, replaceObj) {
    fs.writeFileSync(writeTo, nunjucks.renderString(fs.readFileSync(readFrom, "utf8"), replaceObj).replace(/^\s*$(?:\r\n?|\n)/gm, ''), "utf8")
  },
  async readWriteFile(readFrom, writeTo, replaceObj) {
    if (fs.existsSync(writeTo)) {
      const answer = await promptly.confirm(`${writeTo} Exist, Are you sure override?`)
      if (answer) {
        this._readWriteFile(readFrom, writeTo, replaceObj)
        console.log('overwritten!')
      } else {
        console.log('canceled!')
      }
    } else {
      this._readWriteFile(readFrom, writeTo, replaceObj)
    }
  }
}