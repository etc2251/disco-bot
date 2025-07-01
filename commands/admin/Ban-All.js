module.exports = {
  name: "ban-all",
  description: "Ban all non-admin users (use with extreme caution!).",
  admin: true,
  async execute(message, args, client, config) {
    if (!message.guild.members.me.permissions.has('BanMembers')) {
      return message.channel.send("I don't have permission to ban members.");
    }

    const members = await message.guild.members.fetch();

    const toBan = members.filter(m => !m.user.bot && !config.admins.includes(m.id));

    message.channel.send(`Banning ${toBan.size} users...`);

    for (const member of toBan.values()) {
      try {
        await member.ban({ reason: 'Mass ban issued by admin command' });
      } catch (e) {
        console.log(`Failed to ban ${member.user.tag}: ${e.message}`);
      }
    }

    message.channel.send("Ban process completed.");
  }
};
