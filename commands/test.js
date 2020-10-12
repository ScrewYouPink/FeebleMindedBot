const config = require("../config/client.json")

module.exports = {
    name: 'test',
    description: 'test for new log system!',
    type: 'UTIL',
    execute(message){
        SID = message.guild.id
        var thisServer = config.guilds[SID]
        var OwnerID = thisServer.ownerid
        message.channel.send(OwnerID)
    }
}