import { SlashCommandBuilder } from 'discord.js'

const Poll = new SlashCommandBuilder()
  .setName('poll')
  .setDescription('Ask a question and define up to 4 answers')
  .addStringOption(args =>
    args.setName('question')
      .setDescription('Your question goes here')
      .setRequired(true)	
  )
  .addStringOption(args =>
    args.setName('total_options')
      .setDescription('The number of options you want to add')
      .setRequired(true)
      .addChoices(
        { name: '2', value: '2'},
        { name: '3', value: '3'},
        { name: '4', value: '4' },
      )
  )
  .addStringOption(args =>
    args.setName('timeout')
      .setDescription('How much time will your poll last?')
      .setRequired(true)
      .addChoices(
        { name: '1 minute', value: '60000' },
        { name: '5 minutes', value: '300000' },
        { name: '15 minutes', value: '900000' },
        { name: '30 minutes', value: '1800000' },
        { name: '1 hour', value: '3600000' },
        { name: '2 hours', value: '7200000' },
      )
  )
  .addStringOption(args =>
    args.setName('choice_1')
      .setDescription('Write the first choice')
      .setRequired(true)	
  )
  .addStringOption(args =>
    args.setName('choice_2')
      .setDescription('Write the second choice')
      .setRequired(true)	
  )
  .addStringOption(args =>
    args.setName('choice_3')
      .setDescription('Write the third choice')
      .setRequired(false)	
  )
  .addStringOption(args =>
    args.setName('choice_4')
      .setDescription('Write the fourth choice')
      .setRequired(false)	
  )

  export default Poll