import { Client,GatewayIntentBits } from 'discord.js'
import { pollButtonEvents, pollCommandEvents } from './events'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on('interactionCreate', pollButtonEvents)
client.on('interactionCreate', pollCommandEvents)

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} is up and running!`)
})

export default client
