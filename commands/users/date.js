module.exports = {
  name: "date",
  description: "Show current date.",
  execute(message) {
    const today = new Date().toLocaleDateString();
    message.channel.send(`Today's date is ${today}`);
  }
};
