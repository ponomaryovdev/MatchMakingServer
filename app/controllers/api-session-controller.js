var shell = require('shelljs');
var masterGamePath = '../../mastergame/metaverseserver/LinuxServer/MultiplayerTemplate/Binaries/Linux/';
const { spawn } = require('node:child_process');

const runNewSessionInstance = function()
{
    shell.chmod('+x', 'masterGamePath/MultiplayerTemplateServer');
    let grep = spawn('./masterGamePath/MultiplayerTemplateServer', '-log');
    return grep.pid;
}

const endSessionInstance = function(pid)
{
    let ffmpegProcess = spawn("ffmpeg", args);
    let stopRecording = function() {
    ffmpegProcess.kill();
};
    shell.exec('kill ' + pid, function(err, stdout, stderr) {
        console.log(stdout);
      });
}

module.exports = {
    runNewSessionInstance,
    endSessionInstance
}
