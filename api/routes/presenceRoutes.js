'use strict';

module.exports = function (app) {
    let presenceController = require('../controllers/presenceController');


    app.route('/presence')
        .get(presenceController.getLatestPresenceForAllPersons);

    app.route('/presence/:name')
        .get(presenceController.getPresenceForSpecificPerson);

    app.route('/presence/:name/home')
        .get(presenceController.addOrUpdatePresenceForSpecificPerson)
        .put(presenceController.addOrUpdatePresenceForSpecificPerson)
        .delete(presenceController.addOrUpdatePresenceForSpecificPerson);

    app.route('/presence/:name/alerted')
        .get(presenceController.updateAlertedStateForSpecificPerson)
        .put(presenceController.updateAlertedStateForSpecificPerson);
};
