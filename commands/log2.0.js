const { MessageEmbed} = require("discord.js");
const { LOGO } = require(`../config/MyVarbs.json`);
const fs = require("fs")


module.exports = {
    name: 'log',
    description: 'test for new log system!',
    type: 'UTIL',
    execute(message){

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
                .setAuthor(`LOG`, LOGO)
                .setThumbnail(LOGO)
                .setColor('#FFAE00')
                .setDescription(`**TEST** A Test of Log 2.0 happened`)
                    embed.setTimestamp();



                    message.client.channels.cache.get(thisServer.logchannel).send(embed)
                }
            })


        }
    }