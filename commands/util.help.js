const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "commands"],
  description: "This command, duh",
  type: "UTIL",
  
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle("What I can Do!")
      .setThumbnail("https://images.emojiterra.com/google/android-oreo/512px/1f528.png")
      .setColor("#fca3b7");

    commands.forEach((cmd) => { //sorting / classifying
      helpEmbed.addField(
        `**${cmd.type} | ${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

<<<<<<< Updated upstream:commands/help.js
    return message.author.send(helpEmbed)
    .catch(() => message.reply("I cannot send message to you!")); //sends it
=======
    return message.author.send(helpEmbed).catch(console.error); //sends it
>>>>>>> Stashed changes:commands/util.help.js
  }
};