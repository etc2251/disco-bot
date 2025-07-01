module.exports = {
  name: "kick-user",
  description: "Kick a specified user.",
  admin: true,
  async execute(message, args, client, config) {
    if (!message.guild.members.me.permissions.has('KickMembers')) {
      return message.channel.send("I don't have permission to kick members.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.channel.send("Please mention a user to kick.");

    if (config.admins.includes(user.id)) {
      return message.channel.send("You cannot kick an admin!");
    }

    try {
      await user.kick(`Kicked by ${message.author.tag}`);
      message.channel.send(`${user.user.tag} has been kicked.`);
    } catch (e) {
      message.channel.send(`Failed to kick: ${e.message}`);
    }
  }
};
