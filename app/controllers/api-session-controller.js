var shell = require('shelljs');
const utils = require('../utils/utils');
const { spawn } = require('node:child_process');
const path = require('path');
const PROJECTNAME = 'RoomTest';

var proeccesInstances = {};

const getMasterGamePath = function()
{
    if(utils.isWindows()){
        let pathd = path.join(process.cwd(), 'mastergame', 'metaverseserver', 'WindowsServer', PROJECTNAME, 'Binaries', 'Win64');
        return pathd;
    }
    if(utils.isLinux()){
        let pathd = path.join(process.cwd(), 'mastergame', 'metaverseserver', 'WindowsServer', PROJECTNAME, 'Binaries', 'Win64');
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
        let pathd = path.join(getMasterGamePath(), `${PROJECTNAME}Server.exe`);
        instanceProcess = spawn(`${pathd}`, ['-log', `?port=${port}`], { shell: true });
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
        let subproc = proeccesInstances[pid];
        subproc.kill();
        console.log("kill " + pid);
    };
}

module.exports = {
    runNewSessionInstance,
    endSessionInstance
}
