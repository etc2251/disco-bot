module.exports = {
  name: "start-event",
  description: "Announce event start in the channel.",
  admin: true,
  async execute(message) {
    message.channel.send("🎉 The event has started! Join in!");
  }
};
