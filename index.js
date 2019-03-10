const discord = require('discord.js')
const wtf = require('what-the-commit')
const getToken = require('./getToken')

const client = new discord.Client()

// client.on('warn', (warn) => console.log(`Warning: ${warn}`))
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', (message) => {
  if (message.content.trim() === '!commit') {
    wtf().then(commit => message.channel.send(commit))
  }
})

function login () {
  client.login(getToken())
    .then(() => {
      client.on('disconnect', reconnect)
      client.on('error', reconnect)
    })
    .catch(err => {
      if (err.toString().includes('invalid token') || err.toString().includes('Incorrect login')) {
        console.error(`Error: Token ${getToken()} rejected by Discord!`)
        process.exit()
      } else {
        console.error("Couldn't connect to Discord! Trying again...")
        login()
      }
    })
}

function reconnect () {
  console.error('Lost connection to Discord, trying to reconnect...')
  login()
}

login()
