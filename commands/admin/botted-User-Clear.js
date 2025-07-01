module.exports = {
  name: "clear-bots",
  description: "Kick all suspected botted users (bots with no activity).",
  admin: true,
  async execute(message, args, client, config) {
    if (!message.guild.members.me.permissions.has('KickMembers')) {
      return message.channel.send("I don't have permission to kick members.");
    }

    const members = await message.guild.members.fetch();

    const toKick = members.filter(m => m.user.bot && (Date.now() - m.joinedTimestamp) < 86400000);

    if (toKick.size === 0) return message.channel.send("No botted bots to kick.");

    message.channel.send(`Kicking ${toKick.size} suspected botted bots...`);

    for (const member of toKick.values()) {
      try {
        await member.kick("Botted bot cleanup");
      } catch (e) {
        console.log(`Failed to kick ${member.user.tag}: ${e.message}`);
      }
    }

    message.channel.send("Kick process completed.");
  }
};
