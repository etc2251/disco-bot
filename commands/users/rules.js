module.exports = {
  name: "rules",
  description: "Display server rules.",
  execute(message) {
    const rules = [
      "1. Be respectful to everyone.",
      "2. No spamming or flooding the chat.",
      "3. No hate speech or discrimination.",
      "4. Follow Discord's Terms of Service.",
      "5. Use channels appropriately.",
    ];
    message.channel.send(rules.join('\n'));
  }
};
