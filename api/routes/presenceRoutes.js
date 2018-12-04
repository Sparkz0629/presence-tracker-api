'use strict';

module.exports = function (app) {
    let versionResultController = require('../controllers/presenceController');


    app.route('/presence')
        .get(versionResultController.getLatestPresenceForAllPersons);

    app.route('/presence/:name')
        .get(versionResultController.getPresenceForSpecificPerson);

    app.route('/presence/:name/:status')
        .get(versionResultController.addOrUpdateNewPresenceForSpecificPerson)
        .put(versionResultController.addOrUpdateNewPresenceForSpecificPerson);

    app.route('/presence/:name/:status/:alerted')
        .get(versionResultController.updateAlertedStateForSpecificPerson)
        .put(versionResultController.updateAlertedStateForSpecificPerson);
};
