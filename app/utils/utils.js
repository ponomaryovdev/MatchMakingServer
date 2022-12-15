const { networkInterfaces } = require('os');


var getlocalIP = function()
{
    const nets = networkInterfaces();
    const results = Object.create(null);

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    return results['Беспроводная сеть'][0];
}

var findRoomByName = function(name){
    var roomName = name;
    var index = data.findIndex(function(item, i){
        return item.name === roomName
    });
    return index;
}

module.exports = {
    getlocalIP,
    findRoomByName
 };

