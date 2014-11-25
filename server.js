var zetta = require('zetta');
var Photocell = require('zetta-photocell-mock-driver');
var Led = require('zetta-mock-led-driver');

var app = require('./apps/app');
var splunkCollector = require('./apps/splunk_logger')({
  apiKey: 'qyWdiqeWvODTWHzTT7BMoBVh1-UDajes_mpwV-Z4IjLgGtfrZ_bfWoHaSphdEi1yPZ6lsMyqYxI=',
  projectId: '49596e4674da11e4963222000a9e07fe',
  apiHostName: 'api-uvmt-9x9v.data.splunkstorm.com'
});

zetta()
  .use(Led)
  .use(Photocell, 1)
  .use(Photocell, 2)
  .use(Photocell, 3)
  .use(app)
  .use(splunkCollector)
  .listen(1337);
