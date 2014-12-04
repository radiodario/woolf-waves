var fs = require('fs');

var text = fs.readFileSync('text.txt', 'utf-8');
var data = [];


function process(text) {

  var lines = text.split(";");
  var data = lines.map(processLine);

  console.log("there were", lines.length, "semicolons");

  fs.writeFileSync('processed.json', JSON.stringify({ data: data }, null, " "));
}

function processLine(line, i) {
  // XXX tokenize properly
  var words = line.trim().replace(/\n/g, ' ').replace(/\r/g, ' ').split(' ');

  return {
    i: i,
    firstWord : words[0],
    lastWord: words[words.length - 1],
    numberOfWords : words.length
  };

}


process(text);



// 39