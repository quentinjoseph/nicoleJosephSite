function handleError(e){throw new Error(e.ErrorMessage)}function errorCallback(e){return function(t){console.log(t),e.status(500),e.send("ERROR!")}}const express=require("express"),bodyParser=require("body-parser"),pg=require("pg"),app=express();var mailjet=require("node-mailjet").connect("7672f7d7861def0d58556c8fde5fd009","e46c285ea610edd14646958ed4ce3223");app.use(express.static("public")),app.use(bodyParser.json());var pool=new pg.Pool({user:"postgres",password:"quentin",host:"localhost",port:5432,database:"nicole",ssl:!1});app.post("/events",function(e,t){var n=e.body,o=[n.eventName,n.date,n.description,n.lat,n.lng,n.linkto];pool.query("INSERT INTO events(eventname, eventdate, description, lat, lng, linkto) VALUES ($1::text, $2::date, $3::text, $4::decimal, $5::decimal, $6::text)",o).then(function(){t.status(201),t.send("INSERTED")}).catch(errorCallback(t))}),app.post("/eventmanage",function(e,t){var n=e.body,o=e.body.text,a=o.replace(/"/g,""),r=e.body.column,s=[o,n.id],c=[a,n.id];console.log(r),"description"==r?pool.query("UPDATE events SET description = $1::text WHERE id =$2::int",s).then(function(){t.status(201),t.send("INSERTED")}).catch(errorCallback(t)):"event name"==r?pool.query("UPDATE events SET eventname = $1::text WHERE id =$2::int",s).then(function(){t.status(201),t.send("INSERTED")}).catch(errorCallback(t)):"link"==r?pool.query("UPDATE events SET linkto = $1::text WHERE id =$2::int",s).then(function(){t.status(201),t.send("INSERTED")}).catch(errorCallback(t)):"date"==r&&pool.query("UPDATE events SET eventdate = $1::date WHERE id =$2::int",c).then(function(){t.status(201),t.send("INSERTED")}).catch(errorCallback(t))}),app.post("/contact",function(e,t){function n(){email={},email.FromName=o.name,email.FromEmail="soprano.nicole.joseph@gmail.com",email.Subject="Message From "+o.email,email.Recipients=[{Email:"soprano.nicole.joseph@gmail.com"}],email["Text-Part"]=o.message,mailjet.post("send").request(email).then(function(){t.status(201),t.send("Sent")}).catch(errorCallback(t))}var o=e.body;n()}),app.get("/events",function(e,t){pool.query("SELECT * FROM events ORDER BY eventdate ASC").then(function(e){t.send(e.rows)}).catch(function(e){console.log(e)})}),app.get("/recent",function(e,t){pool.query("SELECT * FROM events where eventdate + INTERVAL '24 HOUR' > now() ORDER BY eventdate ASC LIMIT 3").then(function(e){e.rows.length<3?pool.query("SELECT * FROM events ORDER BY eventdate DESC LIMIT 3").then(function(e){t.send(e.rows),console.log(e.rows.length)}):(console.log(e.rows.length),t.send(e.rows))}).catch(function(e){console.log(e)})}),app.get("/viewevent",function(e,t){var n=e.query.id;n=Number(n);var o=[n];pool.query("select * from events where id = $1::int",o).then(function(e){t.send(e.rows)}).catch(function(e){console.log(e)})});var port=process.env.PORT||5e3;app.listen(port,function(){console.log("JSON Server is running on "+port)});