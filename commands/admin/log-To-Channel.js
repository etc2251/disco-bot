module.exports = {
  name: "log",
  description: "Send a log message to the designated log channel.",
  admin: true,
  async execute(message, args, client, config) {
    const logChannel = message.guild.channels.cache.get(config.logChannelId);
    if (!logChannel) return message.channel.send("Log channel not set or invalid.");

    const logMessage = args.join(" ");
    if (!logMessage) return message.channel.send("Please provide a message to log.");

    logChannel.send(`[LOG] ${message.author.tag}: ${logMessage}`);
    message.channel.send("Log message sent.");
  }
};
