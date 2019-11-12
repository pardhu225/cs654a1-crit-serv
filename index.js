const express = require('express');

var args = process.argv.slice(2);

var randOffset, randRange;
var serviceAvailable = true;
var machineName = args[0];

if (args[0] === 'VM1') {
    randOffset = 1;
    randRange = 40;
} else if (args[0] === 'VM2') {
    randOffset = 70;
    randRange = 30;
} else {
    throw new Error("Invalid VM name");
}

const app = express();
const port = args[1] || 5000;

// Demo purposes only
app.get("/set-availability", (req, res) => {
    serviceAvailable = req.query.av === "true" ? true : false;
    res.status(200).send(`Availability of ${machineName} set to ${serviceAvailable}`);
});

app.get("/crit-serv", (req, res) => {
    if (!serviceAvailable) {
        res.status(503).send("Service unavailable");
        console.log('[crit-serv] Unavailable');
    } else {
        var a;
        res.json({rand: a = randOffset + Math.floor((randRange+1)*Math.random()), sum: parseInt(req.query.n1) + parseInt(req.query.n2)});
        console.log('[crit-serv] Sent ' + a + ' and sum='+(req.query.n1 + req.query.n2));
    }
});

app.listen(port, () => {
    console.log("App now listening on port "+ port);
});
