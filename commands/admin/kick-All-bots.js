module.exports = {
  name: "kick-bots",
  description: "Kick all bots from the server.",
  admin: true,
  async execute(message) {
    if (!message.guild.members.me.permissions.has('KickMembers')) {
      return message.channel.send("I don't have permission to kick members.");
    }

    const bots = (await message.guild.members.fetch()).filter(m => m.user.bot);
    if (bots.size === 0) return message.channel.send("No bots to kick.");

    message.channel.send(`Kicking ${bots.size} bots...`);

    for (const bot of bots.values()) {
      try {
        await bot.kick("Kick all bots command");
      } catch (e) {
        console.log(`Failed to kick ${bot.user.tag}: ${e.message}`);
      }
    }

    message.channel.send("All bots kicked.");
  }
};
