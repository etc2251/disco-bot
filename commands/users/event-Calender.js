module.exports = {
  name: "calendar",
  description: "Show upcoming events.",
  execute(message) {
    const events = [
      { date: "July 4", event: "Independence Day" },
      { date: "October 31", event: "Halloween" },
      { date: "December 25", event: "Christmas" },
    ];

    const eventList = events.map(e => `📅 **${e.date}**: ${e.event}`).join('\n');
    message.channel.send(`Upcoming events:\n${eventList}`);
  }
};
