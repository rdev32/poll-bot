import 'dotenv/config'
import Poll from './poll'
import { REST, Routes } from 'discord.js'

const commands = new Array
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

commands.push(Poll.toJSON())

(async () => {
	try {
		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT), { body: commands })
		console.log(`Successfully registered ${data.length} application commands.`)
	} catch (error) {
		console.error(error)
	}
})()
