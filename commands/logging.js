const fs = require("fs")
const fileName = './config/client.json'

module.exports = {
    name: 'setlog',
    description: 'sets the channel of log 2.0',
    type: 'UTIL',
    execute(message, args){
        if (args == "on"){
            SID = message.guild.id;
            CID = message.channel.id;
            var data = '';
            var readStream = fs.createReadStream(fileName, 'utf8');
            readStream.on('data', function(chunk) {
                data += chunk;
            }).on('end', function() {
                var file = JSON.parse(data)
                var thisServer = file.guilds[SID]
                thisServer.log = true;
                thisServer.logchannel = CID;
                fs.writeFileSync(fileName, JSON.stringify(file, null, 2));
            })
        }
        if (args == "off"){
            SID = message.guild.id;
            var data = '';
            var readStream = fs.createReadStream(fileName, 'utf8');
            readStream.on('data', function(chunk) {
                data += chunk;
            }).on('end', function() {
                var file = JSON.parse(data)
                var thisServer = file.guilds[SID]
                thisServer.log = false;
                fs.writeFileSync(fileName, JSON.stringify(file, null, 2));
            })
        }
    }
}