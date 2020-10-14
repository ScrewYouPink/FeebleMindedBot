const serverQueue = queue.get(message.guild.id);
const queue = new Map();
const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");

module.exports = {
    name: 'queue',
    aliases: ["q", "queue", "que"],
    description: 'shows list of que for music',
    type: 'MUSIC',

    execute(message){

        // MUST HAVE A BOT CHANNEL TO USE MUSIC COMMANDS!
        if (botchannel.id == message.channel.id) { 
        } else return message.reply(`I am sorry, you must be in the ${botchannel} to use commands like that`);{
        }

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel){
            return message.channel.send("you must be in a voice channel");
        }
        const permissions = voiceChannel.permissionsFor(message.Client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send(
                "yo, give me some perms, I can't join, smh" 
            );
        }
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.reply("There's nothing playing, play some music already").catch(console.error);

        const description = queue.song.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);
    
        let queueEmbed = new MessageEmbed()
            .setTitle("Playing on FM Pink Radio")
            .setDescription(description)
            .setColor("#fca3b7")

        const splitDescription = splitMessage(description , {
            maxLength: 2048,
            char: "\n",
            prepend: "",
            append: ""
        });
        
        splitDescription.forEach(async (m) => {
            queueEmbed.setDescription(m);
            message.channel.send(queueEmbed);
          });
    }
}