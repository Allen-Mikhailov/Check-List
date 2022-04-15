require('dotenv').config()

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.CLIENT_TOKEN
const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID
const { Client, Intents } = require("discord.js")
const interactions = require("./interactionHandler.js")

const commands = []
for (cmdname in interactions)
{
    commands.push(interactions[cmdname].create())
}

commands.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	interactions[commandName].call(interaction)
});

client.login(token);

var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function () {
    console.log("Exit")
    client.destroy()
    process.exit()
  });