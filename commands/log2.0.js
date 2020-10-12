const { MessageEmbed} = require("discord.js");
const serverconfig = require("../config/client.json")

module.exports = {
    name: 'log',
    description: 'test for new log system!',
    type: 'UTIL',
    execute(message){
        var config = serverconfig.guilds;  
        message.channel.send(serverconfig)
        var SID = message.guild.id;
        message.channel.send(SID)
        var Sconfig = config.filter(x => x.name === SID);
        var logChannel = Sconfig.logchannel;
        var log = Sconfig.log;
        if (log) {
            var embed = new MessageEmbed()
            .setAuthor(`**AUTO NUKE**`, client.me.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setColor('#FFAE00')
            .setDescription(`**TEST** A Test of Log2.0 happened`)
                embed.setTimestamp();
                logChannel.send(embed)
        }
    }
}