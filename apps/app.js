module.exports = function(server) {
  var ledQuery = server.where({type: 'led'});
  var heartbeatQuery = server.where({type: 'photocell'});
  server.observe([heartbeatQuery, ledQuery], function(heartbeat, led) {
    heartbeat.streams.intensity.on('data', function(msg) {
      if (msg.data > 1.8) {
        led.call('turn-on', function(){});
      } else if(msg.data < 1) {
        led.call('turn-off', function(){});
      }
    });
  });
};
