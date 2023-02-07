import {     
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js'

async function pollButtonEvents (interaction) {
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
              updateSessionCount(interaction.message.id, 'button_0', parseInt(interactionFields[0].value, interactionEdit.title))
              interactionEdit.addFields(interactionFields)
              break

          case 'button_1':
              joinSession(interaction.message.id, interaction.user.id)
              interactionFields[1].value = (parseInt(interactionFields[1].value) + 1).toString()
              updateSessionCount(interaction.message.id, 'button_1', parseInt(interactionFields[1].value, interactionEdit.title))
              interactionEdit.addFields(interactionFields)
              break

          case 'button_2':
              joinSession(interaction.message.id, interaction.user.id)
              interactionFields[2].value = (parseInt(interactionFields[2].value) + 1).toString()
              updateSessionCount(interaction.message.id, 'button_2', parseInt(interactionFields[2].value, interactionEdit.title))
              interactionEdit.addFields(interactionFields)
              break

          case 'button_3':
              joinSession(interaction.message.id, interaction.user.id)
              interactionFields[3].value = (parseInt(interactionFields[3].value) + 1).toString()
              updateSessionCount(interaction.message.id, 'button_3', parseInt(interactionFields[3].value, interactionEdit.title))
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
}

export default pollButtonEvents