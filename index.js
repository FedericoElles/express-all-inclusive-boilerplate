"user strict";


//import modules
var path = require('path');
var express = require('express');
var useragent = require('express-useragent');
var allinc = require('express-all-inclusive');


//variables
var app = express();
var localhost = process.env.PORT ? false : true; //heroku specific
var STATIC = {
  version: '0.0.1',
  OK: {status: 'OK'},
  fail: function(msg){
    return {status: 'ERROR', reason: msg};
  }
};

//express app options
app.set('port', (process.env.PORT || 5000));

//express middleware
app.use(useragent.express());




/*████╗ ██████╗ ██╗
██╔══██╗██╔══██╗██║
███████║██████╔╝██║
██╔══██║██╔═══╝ ██║
██║  ██║██║     ██║
╚═╝  ╚═╝╚═╝     ╚*/





/*█████╗████████╗ █████╗ ████████╗██╗ ██████╗
██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║██╔════╝
███████╗   ██║   ███████║   ██║   ██║██║     
╚════██║   ██║   ██╔══██║   ██║   ██║██║     
███████║   ██║   ██║  ██║   ██║   ██║╚██████╗
╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚════*/


allinc.addFolder('mobile', {
  version: STATIC.version
});

allinc.addFolder('desktop', {
  version: STATIC.version
});



app.get('/', function(req, res) {
  if (!req.useragent.isMobile){
    //static landing page
    allinc.desktop.serve(req, res, {});
  } else {
    //mobile app
    allinc.mobile.serve(req, res, {
      include: [
      '/mobile/libs/geolocator.js',
      //custom
      //reusable
      '/mobile/tags/app.js',
      '/mobile/css/normalize.css', 
      '/mobile/css/skeleton.css', 
      '/mobile/css/app.sass.css'
      ]
    });    
  }
 }); 





app.get('/mobile/tags/*', allinc.mobile.riot()); //support for riot tags
app.get('/mobile/*', allinc.mobile.serve());
app.get('/desktop/*', allinc.desktop.serve());

app.get('/cache.appcache', allinc.mobile.serve());


//static resources like img or js files
app.use(express.static('static')); 



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


/*
 * Localhost Debugging
 */
if (localhost){
  allinc.watch(app.get('port') + 1);
}