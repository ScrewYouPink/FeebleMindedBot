const { Client } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'awake',
    aliases: ["ping", "zzz", "hello"],
    description: 'this is a ping command',
    type: 'UTIL',
    execute(message){
        message.channel.send("Pinging...").then(m =>{
              var ping = m.createdTimestamp - message.createdTimestamp;
              var botPing = Math.round(Client.pi);
              
              //this is the final outcome,
              var embed = new MessageEmbed()
              .setAuthor("Ping")
              .setColor('#fca3b7')
              .setDescription(`
              :ping_pong:**Pong!** 
                  ${ping} ms
                  `)
              embed.setTimestamp();
              const channel = message.guild.channels.cache.find(c => c.name === "bot")
              channel.send(embed)
        }
        )
    }
}
