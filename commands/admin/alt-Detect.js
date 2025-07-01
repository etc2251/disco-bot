module.exports = {
  name: "alt-detect",
  description: "Detect alternate accounts by join date similarity.",
  admin: true,
  async execute(message, args, client, config) {
    const members = await message.guild.members.fetch();


    const suspicious = members.filter(m => {
      if (m.user.bot) return false;
      return members.some(o => o.id !== m.id && Math.abs(m.joinedTimestamp - o.joinedTimestamp) < 60000);
    });

    if (suspicious.size === 0) {
      return message.channel.send("No suspicious alt accounts found.");
    }

    message.channel.send(`Possible alt accounts detected (${suspicious.size}):\n` +
      suspicious.map(m => `${m.user.tag} (Joined: ${new Date(m.joinedTimestamp).toLocaleString()})`).join('\n'));
  }
};
