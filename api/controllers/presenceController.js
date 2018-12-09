'use strict';

const fs = require('fs');

const presenceStoreFile = "./presenceState.json";

function readPresenceFromFile() {
    try {
        // Check if file exists, if not, pass an empty object back
        if (fs.existsSync(presenceStoreFile)) {
            let presences = fs.readFileSync(presenceStoreFile);
            return JSON.parse(presences);
        } else {
            return {};
        }
    }
    catch (err) {
        //If there are any errors during reading of the file, pass an empty object back
        console.log(err);
        return {};
    }
}

function writePresenceToFile(content) {
    fs.writeFileSync(presenceStoreFile, JSON.stringify(content, null, 4));
}

exports.getLatestPresenceForAllPersons = function (req, res) {
    console.log('getLatestPresenceForAllPersons');

    let presences = readPresenceFromFile();
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
    console.log('addOrUpdatePresenceForSpecificPerson:' + req.params.name + '|' + req.params.state);
    const name = req.params.name;
    const state = req.params.state;

    let updatedPresence = {
        "status": state,
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

    presences[name] = {
        "status": presences[name].status,
        "timestamp": Date.now(),
        "alerted": true
    };

    writePresenceToFile(presences);
    res.json(presences);
};
