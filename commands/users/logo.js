module.exports = {
  name: "logo",
  description: "Show the server logo.",
  execute(message) {
    const logoURL = message.guild.iconURL({ dynamic: true, size: 512 });
    if (!logoURL) return message.channel.send("This server has no logo.");
    message.channel.send({ content: "Server logo:", files: [logoURL] });
  }
};
