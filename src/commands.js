import 'dotenv/config'
import { REST, SlashCommandBuilder, Routes } from 'discord.js'

const commands = [
    new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Ask a question and define up to 4 answers')
		.addStringOption(args =>
			args.setName('question')
				.setDescription('Your question goes here')
				.setRequired(true)	
		)
		.addStringOption(args =>
			args.setName('total')
				.setDescription('How many options you will put?')
				.setRequired(true)	
		)
		.addStringOption(args =>
			args.setName('option0')
				.setDescription('First answer')
				.setRequired(true)	
		)
		.addStringOption(args =>
			args.setName('option1')
				.setDescription('Second answer')
				.setRequired(true)	
		)
		.addStringOption(args =>
			args.setName('option2')
				.setDescription('Third answer')
				.setRequired(false)	
		)
		.addStringOption(args =>
			args.setName('option3')
				.setDescription('Fourth answer')
				.setRequired(false)	
		)
		.addStringOption(args =>
			args.setName('timeout')
				.setDescription('How many hours will your poll last?')
				.setRequired(false)	
		),
	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong')
].map(command => command.toJSON())

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);

//console.log(`https://discord.com/api/oauth2/authorize?client_id={${process.env.CLIENT}}&permissions=256064&scope=bot`)