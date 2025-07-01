module.exports = {
  name: "server-info",
  description: "Display server information.",
  execute(message) {
    const { name, memberCount, createdAt, ownerId } = message.guild;
    const owner = message.guild.members.cache.get(ownerId);
    message.channel.send(
      `**Server Name:** ${name}\n` +
      `**Members:** ${memberCount}\n` +
      `**Created On:** ${createdAt.toDateString()}\n` +
      `**Owner:** ${owner ? owner.user.tag : 'Unknown'}`
    );
  }
};
