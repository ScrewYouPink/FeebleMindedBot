const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "stop",
  type: "music",
  aliases: ["leave"],
  description: "Stops the music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("No one is Vibin'").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} Killed all vibes!`).catch(console.error);
  }
};
