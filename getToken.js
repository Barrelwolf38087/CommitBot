const fs = require('fs')

module.exports = function getToken () {
  if (process.argv.length > 2) return process.argv[2]
  else if (process.env.BOT_TOKEN) return process.env.BOT_TOKEN
  else {
    try {
      return fs.readFileSync('./token.txt').toString().trim()
    } catch (err) {
      return ''
    }
  }
}
