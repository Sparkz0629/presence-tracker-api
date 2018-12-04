const express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.VERSION_DB_API_PORT || 5100,
    bodyParser = require('body-parser');

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./api/routes/presenceRoutes')(app);


app.listen(port);
console.log('API server started on: ' + port);
