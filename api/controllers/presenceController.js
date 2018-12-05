'use strict';

const fs = require('fs');

const presenceStoreFile = "./presenceState.json";

function readPresenceFromFile() {
    try {
        // Check if file exists, if not, pass an empty object back
        if (fs.existsSync(presenceStoreFile)) {
            let presences = fs.readFileSync(presenceStoreFile);
            return JSON.parse(presences);
        }
        return {};
    }
    catch (err) {
        //If there are any errors during reading of the file, pass an empty object back
        return {};
    }
}

function writePresenceToFile(content) {
    fs.writeFile(presenceStoreFile, JSON.stringify(content, null, 4), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

exports.getLatestPresenceForAllPersons = function (req, res) {
    console.log('getLatestPresenceForAllPersons');

    let presences = readPresenceFromFile();
    console.log(presences);
    res.json(presences);
};

exports.getPresenceForSpecificPerson = function (req, res) {
    console.log('getPresenceForSpecificPerson: ' + req.params.name);

    let presences = readPresenceFromFile();
    if (presences[req.params.name]) {
        res.json(presences[req.params.name]);
    } else {
        res.json({});
    }
};

exports.addOrUpdatePresenceForSpecificPerson = function (req, res) {
    console.log('addOrUpdatePresenceForSpecificPerson:' + req.params.name + '|' + req.method);
    const method = req.method;
    const name = req.params.name;

    let updatedPresence = {
        "status": ((method === "PUT" || method === "GET") ? 'entered' : 'exited'), //TODO remove GET
        "timestamp": Date.now(),
        "alerted": false
    };

    let presences = readPresenceFromFile();

    presences[name] = updatedPresence;

    writePresenceToFile(presences);
    res.json(presences);
};

exports.updateAlertedStateForSpecificPerson = function (req, res) {
    console.log('updateAlertedStateForSpecificPerson: ' + req.params.name);
    const name = req.params.name;

    let presences = readPresenceFromFile();

    let updatedPresence = {
        "status": presences[name].status,
        "timestamp": Date.now(),
        "alerted": true
    };

    presences[name] = updatedPresence;

    writePresenceToFile(presences);
    res.json(presences);
};
