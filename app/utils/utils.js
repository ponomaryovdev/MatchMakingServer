const { debug } = require('console');
const { networkInterfaces } = require('os');
var os = require('os');
const request = require('request')

var getCurrentOs = function()
{
    return os.platform();
}

var isWindows = function(){
    if(getCurrentOs() == "win32"){
        return true;
    }
    else{
        return false;
    }
}

var isLinux = function(){
    if(getCurrentOs() == "linux"){
        return true;
    }
    else{
        return false;
    }
}


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

var findRoomIndexByName = function(roomname, mass){
    return mass.findIndex(std=> std.roomname === roomname);
}

var findUserIndexByName = function(username, mass){
    return mass.findIndex(std=> std.username === username);
}

var getWebRtcAddress = function(roomname)
{
    let ip;
    request.post(
        {
          url: 'http://158.160.22.223:3010/api/v1/join',
          headers: { 
            'authorization': 'mirotalksfu_default_secret',
            'Content-Type': 'application/json'
          },
          form: {
            room: roomname,
            name: 'username',
            audio: '1',
            video: '0',
            screen: '0',
            notify: '1',
          },
        },
        (err, response, body) => {
            ip = response.body;
        }
      );

      return ip;

}

module.exports = {
    getlocalIP,
    findRoomIndexByName,
    findUserIndexByName,
    getCurrentOs,
    isWindows,
    isLinux,
    getWebRtcAddress,
 };

