const UPDATETIME = 10000;

const RunStatHandler = app => {
    setTimeout(UpdateStats, UPDATETIME);
}

var sleep = (ms) => {
return new Promise(resolve=>{
    setTimeout(resolve,ms)
})
}

var printStats = () => {
    console.log("---------- STATS ---------");
    console.log("Rooms: " + "");
    console.log("Users: " + "");
    console.log("--------------------------");
}

var UpdateStats = async () =>
{
    while (true)
    {
        printStats();
        await sleep(UPDATETIME);
    }
}

module.exports = {
    RunStatHandler,
    UpdateStats,
    printStats
};