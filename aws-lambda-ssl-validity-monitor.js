var https = require('https');
var aws = require('aws-sdk');

exports.handler = function(event, context) {

  var aOptions = [{
    host: 'player2store.com',
    method: 'get',
    path: '/'
  },{
    host: 'secure.adire.co.uk',
    method: 'get',
    path: '/'
  },{
    host: 'take-a-way.co.uk',
    method: 'get',
    path: '/'
  },{
    host: 'thelabelman.co.uk',
    method: 'get',
    path: '/'
  }];
  
  //number of requests that have returned
  var returnedCount = 0;
  
  var output = [];
  
  function sendEmail(msg){
    var ses = new aws.SES({apiVersion: '2010-12-01'});
    var emailRecipient = ['admin@adire.co.uk'];
    var details = [];
        
    var body = "\n\n\n" + msg;

    var joy = ses.sendEmail({
      Source: "admin@adire.co.uk",
      Destination: { ToAddresses: emailRecipient },
      Message: {
        Subject: {
          Data: '[Lambda] SSL Issue'
        },
        Body: {
          Text: {
            Data: body
          }
        }
      }
    }, function(err, data) {
      if(err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    console.log(joy.response);
  }
  
  function certReturned(res) {
      var authorized = res.socket.authorized;
      var cert = res.socket.getPeerCertificate();
      var domain = cert.subject.CN;
      
      //check to see if the cert is invalid or valid fol less than one month from now
      var validToDate = new Date(cert.valid_to);
      validToDate = validToDate.getTime()/1000
      var now = new Date();
      now = now.getTime()/1000
      var aMonthInSeconds = 60*60*24*30;
      
      if(validToDate-now < aMonthInSeconds*7){
          sendEmail(domain+': certificate valid until '+cert.valid_to);
      }
      if(!authorized){
          sendEmail(domain+': certificate invalid');
      }
      
      //decide if we have done all requests and then output as needed
      returnedCount++;
      output.push(domain+': certificate authorized:' + authorized+', valid to '+cert.valid_to);
      if(aOptions.length == returnedCount){
        context.succeed({success:output});
      }
  }

  for (var i in aOptions){
      var options = aOptions[i];
      var req = https.request(
          options,
          certReturned
      );
      req.end();
  }
}
