var fs = require('fs');

var text = fs.readFileSync('text.txt', 'utf-8');


var data = [];


function process(text) {

  var lines = text.split(";");
  var data = lines.map(processLine);

  fs.writeFileSync('processed.json', JSON.stringify({ data: data }, null, " "));

}






function processLine(line, i) {
  // XXX tokenize properly

  var words = line.trim().replace('\n', ' ').replace('\r', ' ').split(' ');

  return {
    firstWord : words[0],
    numberOfWords : words.length
  };

}


process(text);