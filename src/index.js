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

const locales = {
    'es-ES': {
        'vote': 'Ya votaste',
        'poll': 'Encuesta hecha por ',
    },
    'en-US': {
        'vote': 'You already voted',
        'poll': 'Poll made by ',
    }
}

const sessions = []

function createPollEmbed(interaction, erase = false) {
    const optionArguments = []
    const buttons = []
    const embededResults = []
    const total_options = parseInt(interaction.options.getString('total_options'))
    const numberOfButtons = (total_options < 6 && total_options > 1) ? total_options : 2

    for (let i = 1; i <= numberOfButtons; i++)
        optionArguments.push(interaction.options.getString(`choice_${i}`))


    for (let i = 0; i < numberOfButtons; i++) {
        buttons.push(new ButtonBuilder()
            .setCustomId(`button_${i}`)
            .setLabel(`${optionArguments[i]}`)
            .setStyle(ButtonStyle.Secondary))

        embededResults.push({ name: `${optionArguments[i]}`, value: '0', inline: true })
    }

    const optionsRow = new ActionRowBuilder().addComponents(buttons)

    const pollMessage = new EmbedBuilder()
        .setColor(0xf5dd42)
        .setTitle(interaction.options.getString('question'))
        .setDescription(locales[interaction.locale].poll + interaction.user.username)
        .addFields(embededResults)
    
    return (erase) ? 
    { 
        embeds: [pollMessage], 
        components: [new ActionRowBuilder().addComponents(buttons.map(item => item.setDisabled(true)))], 
        fetchReply: true 
    } 
        : 
    { 
        embeds: [pollMessage], 
        components: [optionsRow], 
        fetchReply: true 
    }
}

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

function checkInSession(messageId, userId) {
    for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].id == messageId)
            return sessions[i].users.includes(userId)
    }
    return false
}

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} is up and running!`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return

    const interactionEmbedMessage = interaction.message.embeds.pop()
    const interactionEdit = new EmbedBuilder()
        .setColor(interactionEmbedMessage.hexColor)
        .setTitle(interactionEmbedMessage.title)
        .setDescription(interactionEmbedMessage.description)

    let interactionFields = interactionEmbedMessage.fields
    let responseValid = true

    if (checkInSession(interaction.message.id, interaction.user.id)) {
        responseValid = false
    }

    if (responseValid) {
        switch (interaction.customId) {
            case 'button_0':
                joinSession(interaction.message.id, interaction.user.id)
                interactionFields[0].value = (parseInt(interactionFields[0].value) + 1).toString()
                interactionEdit.addFields(interactionFields)
                break

            case 'button_1':
                joinSession(interaction.message.id, interaction.user.id)
                interactionFields[1].value = (parseInt(interactionFields[1].value) + 1).toString()
                interactionEdit.addFields(interactionFields)
                break

            case 'button_2':
                joinSession(interaction.message.id, interaction.user.id)
                interactionFields[2].value = (parseInt(interactionFields[2].value) + 1).toString()
                interactionEdit.addFields(interactionFields)
                break

            case 'button_3':
                joinSession(interaction.message.id, interaction.user.id)
                interactionFields[3].value = (parseInt(interactionFields[3].value) + 1).toString()
                interactionEdit.addFields(interactionFields)
                break

            default:
                break
        }

        await interaction.update({ embeds: [interactionEdit] })
    } else {

        await interaction.reply({
            content: locales[interaction.locale].vote,
            ephemeral: true
        })
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return

    const { commandName } = interaction

    if (commandName === 'poll') {
        const timeout = interaction.options.getString('timeout')
        const msg = createPollEmbed(interaction)
        try {
            const reply = await interaction.reply(msg)
            createSession(reply.id)
            setTimeout(async () => await interaction.editReply(createPollEmbed(interaction, true)), timeout)
        } catch (error) {
            console.log(error)
        }
    }
})

client.login(process.env.TOKEN)