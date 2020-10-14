const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["delete"],
  type: "util",
  description: "Deletes X messages.",
  execute(message, args) {
  	if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don\'t have permissions to do this command")
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send("I don\'t have permissions to do this command")
    if (!args[0]) return message.channel.send("You need to specify an ammount of messages to purge")
    if (isNaN(args[0])) return message.channel.send("That isn\'t a valid amount of messages to purge")
    if (args[0] > 100 || args[0] < 2) return message.channel.send("Make sure that your amount is ranging 2 - 100")
    	try {
    		message.channel.bulkDelete(args[0]).then(() => {
    			message.channel.send(`Deleted ${args[0]} messages.`).then(msg => {
    				msg.delete(3000)
    			}).catch (error)
    		});
    	} catch (error) {
    		console.log(error)
      }
      const fs = require('fs')
      var data = '';
      var readStream = fs.createReadStream('./config/client.json', 'utf8');
      readStream.on('data', function(chunk) {
          data += chunk;
      }).on('end', function() {
          var config = JSON.parse(data)
          SID = message.guild.id
          var thisServer = config.guilds[SID]
          var log = thisServer.log
          if (log) {
            var embed = new MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setColor('#FFAE00')
            .setDescription(`
              **Deleted:** ${args[0]}
              **Action:** Purge
              **Channel:** ${message.channel}
              `)
              message.client.channels.cache.get(thisServer.logchannel).send(embed)
            }
          })
  }
};
