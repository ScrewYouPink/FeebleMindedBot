const { DEV_ID, DEV_ID2 } = require("../config/config.json");

module.exports = {
  name: "suspend",
  description: "Suspend the bot.",
  type: 'DEV',
  execute(message){
    client = message.client;
    if (message.author.id == DEV_ID || DEV_ID2){ //looks for DEV ID of me and anna
        client.suspend = client.suspend ? false : true
        if (client.suspend){return message.channel.send("suspend mode on!")}else {return message.channel.send("suspend mode off!")}
    }
  }
}