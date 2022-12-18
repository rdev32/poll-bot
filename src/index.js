import 'dotenv/config'
import { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder,
    ButtonStyle
} from 'discord.js'


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]
})

const sessions = []

function createSession(messageId) {
    sessions.push({
        id: messageId,
        users: []
    })
}

function joinSession(messageId, userId) {
    for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].id == messageId)
            sessions[i].users.push(userId)
    }
}

function alreadyVoted(messageId, userId) {
    for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].id == messageId)
            return sessions[i].users.includes(userId) ? true : false
    }
}

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} is up and running!`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return
    
    const interactionButton = interaction.customId
    const interactionEmbedMessage = interaction.message.embeds.pop()
    const interactionEdit = new EmbedBuilder()
        .setColor(interactionEmbedMessage.hexColor)
        .setTitle(interactionEmbedMessage.title)
        .setDescription(interactionEmbedMessage.description)

    let interactionFields = interactionEmbedMessage.fields
    
    if (sessions.length > 0) {
        if (alreadyVoted(interaction.message.id, interaction.user.id))
            return interaction.reply({
                content: 'Ya votaste',
                ephemeral: true
            })
    }

    switch (interactionButton) {
        case 'btn-0':
            joinSession(interaction.message.id, interaction.user.id)           
            interactionFields[0].value = (parseInt(interactionFields[0].value) + 1).toString()
            interactionEdit.addFields(interactionFields)

            break
            
        case 'btn-1':
            joinSession(interaction.message.id, interaction.user.id)
            interactionFields[1].value = (parseInt(interactionFields[1].value) + 1).toString()
            interactionEdit.addFields(interactionFields)
            break

        case 'btn-2':
            joinSession(interaction.message.id, interaction.user.id)
            interactionFields[2].value = (parseInt(interactionFields[2].value) + 1).toString()
            interactionEdit.addFields(interactionFields)
            break

        case 'btn-3':
            joinSession(interaction.message.id, interaction.user.id)
            interactionFields[3].value = (parseInt(interactionFields[3].value) + 1).toString()
            interactionEdit.addFields(interactionFields)
            break

        default:
            break
    }

    await interaction.update({ embeds: [interactionEdit] })
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return

	const { commandName } = interaction

	if (commandName === 'poll') {
        const totalArg = parseInt(interaction.options.getString('total'))
        const numberOfButtons = (totalArg < 6 && totalArg > 1) ? totalArg : 2
        const optionsArgs = []
        
        for (let i = 0; i < numberOfButtons; i++)
            optionsArgs.push(interaction.options.getString(`option${i}`))

        const buttons = []
        const embedResults = []
        for (let i = 0; i < numberOfButtons; i++) {
            buttons.push(new ButtonBuilder()
                .setCustomId(`btn-${i}`)
                .setLabel(`${optionsArgs[i]}`)
                .setStyle(ButtonStyle.Secondary))
            
            embedResults.push({ name: `${optionsArgs[i]}`, value: '0', inline: true })
        }
        
        const optionsRow = new ActionRowBuilder().addComponents(buttons)
        
        const pollMessage = new EmbedBuilder()
            .setColor(0xf5dd42)
            .setTitle(interaction.options.getString('question'))
            .setDescription(`Poll made by ${interaction.user.tag}`)
            .addFields(embedResults)

		const { id } = await interaction.reply({ embeds: [pollMessage], components: [optionsRow], fetchReply: true})
        createSession(id)
    }
})

client.login(process.env.TOKEN)