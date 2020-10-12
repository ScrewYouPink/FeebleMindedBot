const { MessageEmbed} = require("discord.js");
const config = require("../config/client.json")

module.exports = {
    name: 'log',
    description: 'test for new log system!',
    type: 'UTIL',
    execute(message){
        SID = message.guild.id
        var thisServer = config.guilds[SID]
        var log = thisServer.log
        if (log) {
            var embed = new MessageEmbed()
            .setAuthor(`**LOG**`, )
            .setThumbnail(message.author.displayAvatarURL())
            .setColor('#FFAE00')
            .setDescription(`**TEST** A Test of Log 2.0 happened`)
                embed.setTimestamp();
                logChannel.send(embed)
        }
    }
}