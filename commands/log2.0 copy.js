const serverconfig = require("../config/client.json")

module.exports = {
    name: 'test',
    description: 'test for new log system!',
    type: 'UTIL',
    execute(message){
        console.log(serverconfig.guilds);
    }
}