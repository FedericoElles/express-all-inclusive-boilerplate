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
    res.sendFile(path.join(__dirname, 'desktop', 'index.html'));
  } else {
    //mobile app
    allinc.static.serve(req, res, {
      include: [
      'app.js', 
      '/libs/geo.js',
      '/libs/geolocator.js',
      '/libs/ls.js',
      '/libs/api.js',
      '/libs/emergency.js',
      '/libs/riot.min.js',
      '/libs/hammer.min.js',
      //custom
      '/libs/fn-location.js',
      //reusable
      '/tags/german-date.js',
      '/tags/text-trunc.js',
      '/tags/phone.js',
      '/tags/sidemenu.js',
      '/tags/navbar.js',
      '/tags/splashscreen.js',
      '/tags/app.js',
      '/css/normalize.css', 
      '/css/skeleton.css', 
      '/css/app.sass.css'
      ]
    });    
  }
 }); 




app.get('/tags/*', allinc.mobile.riot()); //support for riot tags
app.get('/desktop/*', allinc.desktop.serve());

app.get('/cache.appcache', allinc.mobile.serve());




app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


/*
 * Localhost Debugging
 */
if (localhost){
  allinc.watch(app.get('port') + 1);
}