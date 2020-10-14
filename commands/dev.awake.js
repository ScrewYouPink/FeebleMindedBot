const { Client } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'awake',
    aliases: ["ping", "zzz", "hello"],
    description: 'this is a ping command',
    type: 'DEV',
    execute(message){
        client = message.client;
        if (message.author.id == DEV_ID || DEV_ID2){ //looks for DEV ID of me and anna
             message.channel.send("Pinging...").then(m =>{
              var ping = m.createdTimestamp - message.createdTimestamp;
              
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
}}
