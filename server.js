const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();





app.use(express.static('public'));
app.use(bodyParser.json());

//pg connection for heroku
// var pool = require("./pg-connection-pool");
var pool = new pg.Pool({
    user: "postgres",
    password: "quentin",
    host: "localhost",
    port: 5432,
    database: "nicole",
    ssl: false
});

function errorCallback(res) {
    return function(err) {
        console.log(err);
        res.status(500);
        res.send("ERROR!");
    }
}

app.post('/events', function(req, res) {
    var event = req.body;
    var sql = "INSERT INTO events(eventname, eventdate, description, lat, lng) VALUES ($1::text, $2::date, $3::text, $4::decimal, $5::decimal)";
    var values = [event.eventName, event.date, event.description, event.lat, event.lng];

    pool.query(sql, values).then(function() {
        res.status(201);
        res.send("INSERTED");
        // adjust();
        // testEmail();
    }).catch(errorCallback(res));
});



app.get('/events', function(req, res) {
    pool.query("SELECT * FROM events ORDER BY eventdate ASC").then(function(result) {
        res.send(result.rows);
    }).catch(function(err) {
        console.log(err);
    });
});
app.get('/recent', function(req, res) {
    pool.query("SELECT * FROM events where eventdate > now() ORDER BY eventdate ASC LIMIT 3").then(function(result) {
            res.send(result.rows);
        }).catch(function(err) {
            console.log(err);
        });
    });

    app.get('/viewevent', function(req, res) {
        var postId = req.query.id;
        postId = Number(postId);
        var values = [postId];
        //this sql variable selects from the data base events that are within our given radius and also within our expiration perameters.
        var sql = "select * from events where id = $1::int";

        pool.query(sql, values).then(function(result) {
          res.send(result.rows);
        }).catch(function(err) {
            console.log(err);
        });
    });


    //heroku port or localhost
    var port = process.env.PORT || 5000;
    app.listen(port, function () {
        console.log('JSON Server is running on ' + port);

    });
//


// CREATE TABLE events (
// id SERIAL UNIQUE PRIMARY KEY,
// eventName VARCHAR(40),
// eventdate TIMESTAMP,
// description VARCHAR(200),
// lat DECIMAL(11,20),
// lng DECIMAL(10,20),
// timeadded TIMESTAMP DEFAULT NOW()
//
// );
