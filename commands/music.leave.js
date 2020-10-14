
module.exports = {
  name: "stop",
  aliases: ["leave"],
  description: "Stops the music",
  type: 'MUSIC',
  execute(message) {

    const botchannel = message.guild.channels.cache.find(c => c.name === "bot")
    const queue = message.client.queue.get(message.guild.id);
    if (botchannel.id == message.channel.id) {
        //code for the command
      } else return message.reply(`I am sorry, you must be in the ${botchannel} to use commands like that`);{
        message.delete();
      }

      if (!queue) return message.reply("No one is Vibin'").catch(console.error);

      queue.songs = [];
      queue.connection.dispatcher.end();
      queue.textChannel.send(`${message.author} Killed all vibes!`).catch(console.error);
    }
  };