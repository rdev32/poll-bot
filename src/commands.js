import 'dotenv/config'
import { REST, SlashCommandBuilder, Routes } from 'discord.js'

let commands = [
    new SlashCommandBuilder()
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
					{ name: '5 seconds', value: '5000' },
					{ name: '15 minutes', value: '900000'},
					{ name: '30 minutes', value: '1800000'},
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
		),
]

commands = commands.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`)
		const data = await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT, 
				process.env.GUILD
			), 
			{ body: commands }
		)
		console.log(`Successfully registered ${data.length} application commands.`)
	} catch (error) {
		console.error(error)
		console.log('Perhaps you forgot to add your token to the .env file?')
		console.log('Or maybe you have not invited the bot to your server yet?')
		console.log(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT}&permissions=256064&scope=bot`)
	}
})()
