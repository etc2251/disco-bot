module.exports = {
  name: "dm",
  description: "DM a user a message.",
  admin: true,
  async execute(message, args, client, config) {
    const user = message.mentions.users.first();
    const dmMessage = args.slice(1).join(" ");
    if (!user || !dmMessage) return message.channel.send("Usage: !dm @user message");

    try {
      await user.send(dmMessage);
      message.channel.send("DM sent.");
    } catch {
      message.channel.send("Could not send DM (user may have DMs disabled).");
    }
  }
};
