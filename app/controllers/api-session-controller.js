var shell = require('shelljs');
const utils = require('../utils/utils');
const path = require('path');
const PROJECTNAME = 'MultiplayerTemplate';
var shell = require('shelljs');
const { spawn } = require('child_process');
const { exec } = require('child_process');


var proeccesInstances = {};

const getMasterGamePath = function()
{
    if(utils.isWindows()){
        let pathd = path.join(process.cwd(), 'mastergame', 'metaverseserver', 'WindowsServer', PROJECTNAME, 'Binaries', 'Win64');
        return pathd;
    }
    if(utils.isLinux()){
        let pathd = path.join(process.cwd(), 'mastergame', 'metaverseserver', 'LinuxServer', PROJECTNAME, 'Binaries', 'Linux');
        return pathd;
    }
}

const runNewSessionInstance = function(port)
{
    let instanceProcess;
    if(utils.isWindows()){
        let pathd = path.join(getMasterGamePath(), `${PROJECTNAME}Server.exe`);
        instanceProcess = spawn(`${pathd}`, ['-log', `?port=${port}`], { shell: true });
        proeccesInstances[instanceProcess.pid] = instanceProcess;
    }
    if(utils.isLinux()){
        instanceProcess = exec(`/home/ponomarevav/Documents/matchmaking/MatchMakingServer/mastergame/metaverseserver/LinuxServer/MultiplayerTemplate/Binaries/Linux/MultiplayerTemplateServer -log ?port=${port}`);
        proeccesInstances[instanceProcess.pid] = instanceProcess;
    }
    return instanceProcess.pid;
}

const endSessionInstance = function(pid)
{
    if(utils.isWindows()){
        let subproc = proeccesInstances[pid];
        subproc.kill('SIGINT');
        console.log("kill " + pid);
    }
    if(utils.isLinux()){

        // let subproc = proeccesInstances[pid];
        // subproc.kill();
        console.log("kill " + pid);
    };
}

module.exports = {
    runNewSessionInstance,
    endSessionInstance
}
