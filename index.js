const fs = require('fs');
const path = require('path');
const { Client, Collection, IntentsBitField, PermissionsBitField } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
  ],
  partials: ['CHANNEL'],
});

client.commands = new Collection();
const prefix = config.prefix;

// Load commands from commands folder recursively
const commandFolders = ['admin', 'users'];

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  // Admin check if command is admin type (we'll add a flag in admin commands)
  if (command.admin && !config.admins.includes(message.author.id)) {
    return message.reply('❌ You do not have permission to use this command.');
  }

  try {
    await command.execute(message, args, client, config);
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing that command.');
  }
});

client.login(config.token);
