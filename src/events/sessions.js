import {     
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js'

class Session {
  constructor(messageId) { 
    this.#id = messageId
    this.#users = new Array
    this.#content = new Array
  }

  get id() { return this.#id }
  get users() { return this.#users }
  get content() { return this.#content }

  set users(id) { this.#users.push(id) }
  set content(message) { this.#content = message }

  #id
  #users
  #content
}

function createPoll(interaction) {
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

  return { embeds: [pollMessage], components: [optionsRow], fetchReply: true }
}

function editedPoll() {

}

function disableButtons(interaction) {
  // const interactionEdit = new EmbedBuilder()
  //     .setColor(0x3de37a)
  //     .setTitle(sessions[interaction.id].options.tag)
  //     .setDescription('alternative X won')
  // return { embeds: interactionEdit }
  console.log(sessions[0].options)
}

function createSession(messageId) {
  sessions.push({
      id: messageId,
      users: [],
      options: []
  })
}

function joinSession(messageId, userId) {
  for (let i = 0; i < sessions.length; i++) {
      if (sessions[i].id == messageId)
          sessions[i].users.push(userId)
  }
}

function updateSessionCount(messageId, option, count, choice_name) {
  for (let i = 0; i < sessions.length; i++) {
      if (sessions[i].id == messageId)
          sessions[i].options.push({ tag : choice_name })
          sessions[i].options.push({ [option] : count })
  }
}

function checkInSession(messageId, userId) {
  for (let i = 0; i < sessions.length; i++) {
      if (sessions[i].id == messageId)
          return sessions[i].users.includes(userId)
  }
  return false
}

export default Session