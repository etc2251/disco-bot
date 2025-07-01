module.exports = {
  name: "ban-user",
  description: "Ban a specified user.",
  admin: true,
  async execute(message, args, client, config) {
    if (!message.guild.members.me.permissions.has('BanMembers')) {
      return message.channel.send("I don't have permission to ban members.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.channel.send("Please mention a user to ban.");

    if (config.admins.includes(user.id)) {
      return message.channel.send("You cannot ban an admin!");
    }

    try {
      await user.ban({ reason: `Banned by ${message.author.tag}` });
      message.channel.send(`${user.user.tag} has been banned.`);
    } catch (e) {
      message.channel.send(`Failed to ban: ${e.message}`);
    }
  }
};
