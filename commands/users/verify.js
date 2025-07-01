const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: "verify",
  description: "Assign the Verified role to yourself.",
  async execute(message) {
    const roleName = "Verified";
    const role = message.guild.roles.cache.find(r => r.name === roleName);
    if (!role) return message.channel.send(`The role "${roleName}" does not exist.`);

    const botMember = await message.guild.members.fetchMe();
    if (!botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.channel.send("I don't have permission to assign roles.");
    }

    if (message.member.roles.cache.has(role.id)) {
      return message.channel.send("You are already verified!");
    }

    if (role.position >= botMember.roles.highest.position) {
      return message.channel.send("My role is not high enough to assign the Verified role.");
    }

    try {
      await message.member.roles.add(role);
      message.channel.send("You are now verified! ✅");
    } catch {
      message.channel.send("Failed to assign the Verified role.");
    }
  }
};
