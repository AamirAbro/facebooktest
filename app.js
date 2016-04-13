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
  res.end("helloworld");
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
