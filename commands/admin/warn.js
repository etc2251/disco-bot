
module.exports = {
  name: "warn",
  description: "Warn a user with a reason.",
  admin: true,
  async execute(message, args) {
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(" ");
    if (!user || !reason) return message.channel.send("Usage: !warn @user reason");

    message.channel.send(`⚠️ ${user.tag} has been warned for: ${reason}`);
  }
};
