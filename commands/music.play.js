const { play } = require("../include/play");
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID } = require("../config.json");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const scdl = require("soundcloud-downloader");

module.exports = {
    name: 'play',
    aliases: ["p", "play"],
    description: 'plays a chosen song',
    type: 'MUSIC',

    async execute(message, args) {

        const botchannel = message.guild.channels.cache.find(c => c.name === "bot")
        if (botchannel.id == message.channel.id) {
          //tells user to go to the only channel named bot ^^^
        } else return message.reply(`I am sorry, you must be in the ${botchannel} to use commands like that`);{
          message.delete();
        }
        //rest of code
        //detecting if you are in VC or not
        const channel = message.member.voice;
        if (!channel) return message.reply("you need to join a VC").catch(console.error);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && channel !== message.guild.me.voice.channel){ // this is meant for no moving the bot etc
            return message.reply(`you must be in the same channel as ${message.client.user}`).catch(console.error);
        }

        if (!args.length){ // this tells the user how to use the command if it doesn't detect a URL or a song name
            return message.reply(`To use this command: ${message.client.prefix}play URL / Song's Name /`).catch(console.error);
        }
            // makes sure that there is permissions for speak and connect
        const permissions = voiceChannel.permissionsFor(message.Client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send(
                "I must have the perms to CONNECT and to SPEAK" 
            );
        }
        //this is how we will test / find / and get the info of videos
        const search = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
        const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
        const url = args[0];
        const urlValid = videoPattern.test(args[0]);
        
        // to test if the playlist exists
       if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
            return message.client.commands.get("playlist").execute(message, args);
          } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
            return message.client.commands.get("playlist").execute(message, args);
        }
        // if the playlist does exist it gets the info of the video
        if (urlValid) {
            try {
                songInfo = await ytdl.getInfo(url);
                song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    duration: songInfo.videoDetails.lengthSeconds
                };

                //if it can't it, it will just say it's a API problem, I need to do some testing to see the real reason why it fails. but I suspect it's due to API not finding the info
            }catch (error) {
                console.error(error);
                return message.reply("the API had a problem finding the video's info").catch(console.error);
            }

            // this is meant for soundcloud, fucking ewy

        } else if (scRegex.test(url)) {
            try {
                const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
                song = {
                  title: trackInfo.title,
                  url: trackInfo.permalink_url,
                  duration: Math.ceil(trackInfo.duration / 1000)
                };
              } catch (error) {
                if (error.statusCode === 404)
                  return message.reply("Could not find that Soundcloud track.").catch(console.error);
                return message.reply("There was an error playing that Soundcloud track.").catch(console.error);
              }
            } else {
              try {
                const results = await youtube.searchVideos(search, 1);
                songInfo = await ytdl.getInfo(results[0].url);
                song = {
                  title: songInfo.videoDetails.title,
                  url: songInfo.videoDetails.video_url,
                  duration: songInfo.videoDetails.lengthSeconds
                };
              } catch (error) {
                console.error(error);
                return message.reply("No video was found with a matching title").catch(console.error);
              }
            }
            // IF IT FINALLY GOES THROUGH THE CHECKPOINT it will be added
            if (serverQueue) {
                serverQueue.songs.push(song);
                return serverQueue.textChannel
                message.delete(1000)
                  .send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
                  .catch(console.error);
            }
        
            // the starting settings for the bot, I did 80 just so you don't get ULTRA MEGA EARRAPED but instead you get META EARRAPED
        const queueConstruction = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 80,
            playing: true
        }

        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);
    
        // joins the channel etc.

        try {
          queueConstruct.connection = await channel.join();
          await queueConstruct.connection.voice.setSelfDeaf(true);
          play(queueConstruct.songs[0], message);
        } catch (error) {
          console.error(error);
          message.client.queue.delete(message.guild.id);
          await channel.leave();
          return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
        }
      }
    };



