var querystring = require('querystring');
var SplunkStorm = require('splunkstorm');

module.exports = function(options) {

  var logger = new SplunkStorm(options);

  return function(server) {
    var heartbeatQuery = server.where({type: 'photocell'});
    server.observe([heartbeatQuery], function(heartbeat) {

      var total = 0;
      var count = 0;
      var last = null;
      function reset() {
        // send
        var opts = {
          topic: last.topic,
          timestamp: last.timestamp,
          data: total/count
        };
        logger.send(querystring.stringify(opts), null, null, null, function(error) {
          if (error) {
            console.error(error)
          }
        });
        total = 0;
        count = 0;
      }
      setInterval(reset, 2000);
      
      heartbeat.streams.intensity.on('data', function(msg) {
        total += msg.data;
        count++;
        last = msg;
      });
    });
  };
};

