module.exports = {
  name: "christmas",
  description: "Show days until Christmas.",
  execute(message) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, 11, 25);
    if (now > christmas) {
      christmas.setFullYear(currentYear + 1);
    }
    const diffTime = christmas - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    message.channel.send(`There are ${diffDays} days until Christmas! 🎄`);
  }
};
