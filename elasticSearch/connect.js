const elasticsearch=require('elasticsearch');

const client = new elasticsearch.Client( {
 host:  'localhost:9200',
 log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster does not seem to be working!');
  } else {
    console.log('elasticsearch cluster looks good!');
  }
});

module.exports = client;
