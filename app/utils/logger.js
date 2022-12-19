const log = require('npmlog');

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

let consoleDate = `[${year}:${month}:${date} ${hours}:${minutes}:${seconds}]`; 

log.enableColor();
log.addLevel('server', 100000, { fg: 'green' },  `${consoleDate} SERVER`);
log.addLevel('room', 100000, { fg: 'yellow' }, `${consoleDate} ROOM`);

module.exports = log;
