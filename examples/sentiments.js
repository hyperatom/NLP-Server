var NLP = require('../');
var path = require('path');

var config = {

	'nlpPath':path.join ( __dirname,'./../corenlp'), //the path of corenlp
	'version':'3.5.2', //what version of corenlp are you using
	'annotators': ['tokenize','ssplit','pos','parse','sentiment','depparse','quote'], //optional!
	'extra' : {
      'depparse.extradependencie': 'MAXIMAL'
    }

};

var coreNLP = new NLP.StanfordNLP(config);

var http = require('http');
var url = require('url');


var server = http.createServer(function (request, response) {
  var queryData = url.parse(request.url, true).query;

  response.writeHead(200, {
      "Content-Type": "text/plain",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  });

  if (queryData.q) {
    
    coreNLP.process(queryData.q, function(err, result) {
	    if(err)
	    	throw err;
	    else
	    	response.end(JSON.stringify(result));
	});
    

  } else {
    response.end("Hello!\n");
  }
});

server.listen(8990);