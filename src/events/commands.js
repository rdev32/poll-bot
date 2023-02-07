import {     
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js'

async function pollCommandEvents (interaction) {
  if (!interaction.isChatInputCommand()) return

  const { commandName } = interaction
  if (commandName !== 'poll') return

  const timeout = interaction.options.getString('timeout')
  const message = createPoll(interaction)

  try {
      const reply = await interaction.reply(message)
      createSession(reply.id)
      setTimeout(async () => await interaction.editReply(disableButtons(interaction)), timeout)
  } catch (error) {
      console.log(error)
  }
}

export default pollCommandEvents
