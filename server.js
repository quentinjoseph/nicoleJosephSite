const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
var pool = require("./pg­-connection­-pool");
// Mailjet variables -api we use to send post id email to user
var mailjet = require('node-mailjet').connect('7672f7d7861def0d58556c8fde5fd009', 'e46c285ea610edd14646958ed4ce3223');
function handleError (err) {
  throw new Error(err.ErrorMessage);
}



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
    var sql = "INSERT INTO events(eventname, eventdate, description, lat, lng, linkto) VALUES ($1::text, $2::date, $3::text, $4::decimal, $5::decimal, $6::text)";
    var values = [event.eventName, event.date, event.description, event.lat, event.lng, event.linkto];

    pool.query(sql, values).then(function() {
        res.status(201);
        res.send("INSERTED");

    }).catch(errorCallback(res));
});

app.post('/eventmanage', function(req, res) {
    var events = req.body;
    var update= req.body.text;
    var updateNum=update.replace(/"/g,"");
    var sectionRep=req.body.column;
    // var sectionRep=section.replace(/"/g,"");
    var sql = "UPDATE events SET description = $1::text WHERE id =$2::int";
    var sql2 = "UPDATE events SET eventname = $1::text WHERE id =$2::int";
    var sql3 = "UPDATE events SET linkto = $1::text WHERE id =$2::int";
    var sql4 = "UPDATE events SET eventdate = $1::date WHERE id =$2::int";
    var values = [update, events.id];
    var values2 = [updateNum, events.id];
    console.log(sectionRep);
    if (sectionRep=='description'){
    pool.query(sql, values).then(function() {
        res.status(201);
        res.send("INSERTED");
    }).catch(errorCallback(res));
    }else if (sectionRep=='event name'){
    pool.query(sql2, values).then(function() {
        res.status(201);
        res.send("INSERTED");
    }).catch(errorCallback(res));
  }else if(sectionRep=='link'){
    pool.query(sql3, values).then(function() {
        res.status(201);
        res.send("INSERTED");
    }).catch(errorCallback(res));
  }else if(sectionRep=='date'){
    pool.query(sql4, values2).then(function() {
        res.status(201);
        res.send("INSERTED");
    }).catch(errorCallback(res));
  }
});

app.post('/contact', function(req, res) {
    var emails = req.body;

    function sendEmail() {
      email = {};
      email['FromName'] =  emails.name ;
      email['FromEmail'] = 'soprano.nicole.joseph@gmail.com' ;
      email['Subject'] = 'Message From '+ emails.email;
      email['Recipients'] = [{'Email': 'soprano.nicole.joseph@gmail.com'}];
      email['Text-Part'] = emails.message ;

      mailjet.post('send')
        .request(email)
        .then(function() {
            res.status(201);
            res.send("Sent");
        }).catch(errorCallback(res));
    }
    sendEmail();

});






app.get('/events', function(req, res) {
    pool.query("SELECT * FROM events ORDER BY eventdate ASC").then(function(result) {
        res.send(result.rows);
    }).catch(function(err) {
        console.log(err);
    });
});
app.get('/recent', function(req, res) {
    pool.query("SELECT * FROM events where eventdate + INTERVAL '24 HOUR' > now() ORDER BY eventdate ASC LIMIT 3").then(function(result) {
      if(result.rows.length < 3){
        pool.query("SELECT * FROM events ORDER BY eventdate DESC LIMIT 3").then(function(result){
          res.send(result.rows);

        })
      }else{

            res.send(result.rows);
          }
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

    app.get('/eventlogin', function(req, res) {
      var username = req.query.username;
      var values = [username];
      var sql = "SELECT * FROM login WHERE username = $1::text";
      console.log(req.body);
        pool.query(sql,values).then(function(result) {
            res.send(result.rows);
        }).catch(function(err) {
            console.log(err);
        });
    });

    app.delete('/deletepost', function(req, res) {
        var userPostid = Number(req.query.postid);
        var sql = "DELETE FROM events WHERE id = $1::int";
        var values= [userPostid]; // <-- This gets the :id part of the URL
        pool.query(sql, values).then(function() {
            res.send("DELETED");
        }).catch(res);
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
