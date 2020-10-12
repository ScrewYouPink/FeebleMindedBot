//this is all written just so I can understand what I was thinking, I'm pretty fucking dumb

//bringing in things
const Discord = require('discord.js');
const { Client, Collection } = require("discord.js");
const { TOKEN, STABLE_PREFIX, DEV_TOKEN, DEV_ID, DEV_ID2, DEV_PREFIX } = require("./config/config.json")
const { readdirSync } = require("fs");
const { join } = require("path");
const { CHANGEL, WHATTODO, } = require(`./config/MyVarbs.json`);
var os = require("os");
var host = os.platform();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const cooldowns = new Collection();

//So the bot CAN NOT do @everyone!
const client = new Client({ disableMentions: "everyone" });

//This logins with beta and stable
if (host == "win32") {
  var loginToken = DEV_TOKEN
var ActivitY = "Testing out new features!"
  var PREFIX = DEV_PREFIX
} else if (host == "linux") {
  var loginToken = TOKEN
  var ActivitY = "Stop looking at me creep..."
  var PREFIX = STABLE_PREFIX
}

//DON'T TOUCH!
client.login(loginToken)
//IMPORTANT, it's just loging in lol, but it's needed or else the bot will not log in to the token
//Client Defs
client.prefix = PREFIX;
client.commands = new Collection();
client.queue = new Map();
client.suspend = false;
client.config = require("./config/client.json")

//getting all the commands, this looks into the filter of files that ends with js to be called.
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

//Tells you the status and puts in a status in discord
if (host == "win32") {
  client.once('ready', () => {
    console.log(`Im awake - said ${client.user.username}`);
    client.user.setActivity("stop fookin lookin");

    //just to give a message that the bot is indeed online
    const botchannel = client.channels.cache.get(`764921629675094036`);
    const goodmornin = new Discord.MessageEmbed() //the embed
        .setColor('#fca3b7')
        .setDescription('I am the beta, ignore me 👉👈')
        .setFooter('the github: https://github.com/ScrewYouPink/FeebleMindedBot');
    botchannel.send(goodmornin) // this sends the embed
});
  //what to do if on windows
  } else if (host == "linux") {
    client.once('ready', () => {
      console.log(`Im awake - said ${client.user.username}`);
      client.user.setActivity(ActivitY);
  
      //just to give a message that the bot is indeed online
      const botchannel = client.channels.cache.get(`764921629675094036`);
      const goodmornin = new Discord.MessageEmbed() //the embed
          .setColor('#fca3b7')
          .setDescription('Thank Pink for turning me back on! 😊')
          .setThumbnail('https://i.imgur.com/sThHYCK.png') // gotta change the picture, might make one :D \ 10/11/2020 done did it
          .addFields(
              { name: '📝Changelog📝', value: `${CHANGEL}`},
              { name: '📍 Whats next?📍 ', value: `${WHATTODO}`},
          )
          .setTimestamp()
          .setFooter('the github: https://github.com/ScrewYouPink/FeebleMindedBot');
      botchannel.send(goodmornin) // this sends the embed
  });
}


//detecting the perfix / this will be used to logging
client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split("/\s+/");
        console.log(CMD_NAME);
        console.log(args);
    }
})


//TIME TO LET THE COMMANDS ROAM

client.on("message", async (message) => {
  if (((client.suspend) && message.author.id == DEV_ID || DEV_ID2) || (!client.suspend)) {
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was a slight issue with your command, the command may not be in use or is being worked, please look at my GitHub: https://github.com/ScrewYouPink/FeebleMindedBot").catch(console.error);  
  }
}
}
);
