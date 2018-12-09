'use strict';

module.exports = function (app) {
    let presenceController = require('../controllers/presenceController');


    app.route('/presence')
        .get(presenceController.getLatestPresenceForAllPersons);

    app.route('/presence/:name')
        .get(presenceController.getPresenceForSpecificPerson);

    app.route('/presence/:name/:state')
        .put(presenceController.addOrUpdatePresenceForSpecificPerson);

    app.route('/presence/:name/alerted')
        .patch(presenceController.updateAlertedStateForSpecificPerson);
};
