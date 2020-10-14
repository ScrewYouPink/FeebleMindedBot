module.exports = {
  
    name: "loop",
    aliases: ['l'],
    description: "Toggle music loop",
    type: 'MUSIC',
    execute(message) {
  
      const botchannel = message.guild.channels.cache.find(c => c.name === "bot")
      if (botchannel.id == message.channel.id) {
        //code for the command
      } else return message.reply(`I am sorry, you must be in the ${botchannel} to use commands like that`);{
        message.delete();
      }
      //checks for song etc.
      const queue = message.client.queue.get(message.guild.id);
      if (!queue) return message.reply("There has to be a song to play").catch(console.error);

      if (channel !== botChannel) {
        member.send("You need to join the voice channel first!").catch(console.error);
      }
  
      // the toggle
      queue.loop = !queue.loop;
      return queue.textChannel
        .send(`Loop is now ${queue.loop ? "**on**" : "**off**"}`)
        .catch(console.error);
    }
  };
  