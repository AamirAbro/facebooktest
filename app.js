const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env,
      express      = require('express');

let fbAppToken = env.FB_APP_TOKEN;

var app = express();

app.use('/static', express.static('static'));

app.get('/health', function(req, res){
  res.writeHead(200);
    res.end();
});

app.get('/info', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.end(JSON.stringify(sysInfo[url.slice(6)]()));
});

app.get('/helloworld', function(req, res){
  console.log("helloworld called");
  res.end("helloworld");
});

// for Authorization
app.get('/facebookwebhook', function (req, res) {
  // if (req.query['hub.verify_token'] === fbAppToken) {
    res.send(req.query['hub.challenge']);
  // }
  // res.send('Error, wrong validation token');
})

app.post('/facebookwebhook/', function (req, res) {
  console.log("facebookwebhook called");
  console.log("req", req);
  var messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    var emessaging_eventsvent = req.body.entry[0].messaging[i];
    var sender = event.sender.id;
    if (event.message && event.message.text) {
      var text = event.message.text;
      console.log("message" + text);
      // sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});



// let server = http.createServer(function (req, res) {
//   let url = req.url;
//   if (url == '/') {
//     url += 'index.html';
//   }

//   // IMPORTANT: Your application HAS to respond to GET /health with status 200
//   //            for OpenShift health monitoring

//   if (url == '/health') {
//     res.writeHead(200);
//     res.end();
//   } else if (url.indexOf('/info/') == 0) {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('Cache-Control', 'no-cache, no-store');
//     res.end(JSON.stringify(sysInfo[url.slice(6)]()));
//   } else if (url.indexOf('helloworld') >= 0) {
//     res.end("helloworld");
//   }
//   else {
//     fs.readFile('./static' + url, function (err, data) {
//       if (err) {
//         res.writeHead(404);
//         res.end();
//       } else {
//         let ext = path.extname(url).slice(1);
//         res.setHeader('Content-Type', contentTypes[ext]);
//         if (ext === 'html') {
//           res.setHeader('Cache-Control', 'no-cache, no-store');
//         }
//         res.end(data);
//       }
//     });
//   }
// });

// server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
//   console.log(`Application worker ${process.pid} started...`);
// });


http.createServer(app).listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});



// var token = env.FB_PAGE_TOKEN;
// function sendTextMessage(sender, text) {
//   var messageData = {
//     text:text
//   }
//   request({
//     url: 'https://graph.facebook.com/v2.6/me/messages',
//     qs: {access_token:token},
//     method: 'POST',
//     json: {
//       recipient: {id:sender},
//       message: messageData,
//     }
//   }, function(error, response, body) {
//     if (error) {
//       console.log('Error sending message: ', error);
//     } else if (response.body.error) {
//       console.log('Error: ', response.body.error);
//     }
//   });
// }
