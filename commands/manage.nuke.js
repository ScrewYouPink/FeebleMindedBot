const { MessageEmbed } = require("discord.js");
const fs = require("fs")

module.exports = {
    name: 'nuke',
    aliases: ["n"],
    description: 'resets entire channel!',
    type: 'UTIL',
    execute(message){

        //Checks for permission
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don\'t have permissions to do this command")
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send("I don\'t have permissions to do this command")
            message.channel.clone(); // this clones it
            message.channel.delete(); // this deletes origin
<<<<<<< Updated upstream:commands/nuke.js
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
                    var embed = new MessageEmbed() // log in audit
                    .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
                    .setThumbnail(message.author.displayAvatarURL())
                    .setColor('#FFAE00')
                    .setDescription(`
                        **Nuked:** A Channel! 
                        ${message.channel.name}
                        `)
                    embed.setTimestamp();
                        message.client.channels.cache.get(thisServer.logchannel).send(embed)
                    }
                })
=======
                var embed = new MessageEmbed() // log in audit
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setColor('#FFAE00')
            .setDescription(`
                **Nuked:** A Channel!
                `)
            embed.setTimestamp();
            const channel = message.guild.channels.cache.find(c => c.name === "audit-log")
            channel.send(embed)
>>>>>>> Stashed changes:commands/manage.nuke.js
    }
}