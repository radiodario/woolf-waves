var midi = require('midi'),
  midiOut = new midi.output();

try {
  midiOut.openPort(0);
} catch(error) {
  midiOut.openVirtualPort('');
}


var lines = require('./processed').data;
var i = 0,
    interval, line;
var BPM = 120;
var noteDuration = 200;

var notes = {
    C:  60,
    Cs: 61,
    D:  62,
    Ds: 63,
    E:  64,
    F:  65,
    Fs: 66,
    G:  67,
    Gs: 68,
    A:  69,
    As: 70,
    B:  71
};


var scale = [
"C",
// "Cs",
"D",
// "Ds",
"E",
"F",
// "Fs",
"G",
// "Gs",
"A",
"As",
// "B"
];


function playNote() {
  line = lines[i++ % lines.length]; // loop forever

  var noteName = scale[line.numberOfWords % scale.length];

  var note = notes[noteName];

  console.log('noteon', noteName, note);

  midiOut.sendMessage([144, note, 100]);
  setTimeout(function() {
    midiOut.sendMessage([128, note, 100]);
  }, noteDuration + Math.random() * 1000 | 0);



}




function play() {
  console.log("Play!");
  playNote();
  interval = setInterval(playNote, 1000/(BPM/60));
}

function stop() {
  console.log("Stop!");
  i = 0;
  clearInterval(interval);
}





// Set up a new input.
var input = new midi.input();

// Count the available input ports.
input.getPortCount();

// Get the name of a specified input port.
input.getPortName(0);

// Configure a callback.
input.on('message', function(deltaTime, message) {
  // console.log('m:' + message + ' d:' + deltaTime);

  switch (message[0]) {
    case 250:
      play();
      break;
    case 251:
      play();
      break;
    case 252:
      stop();
      break;
    default:
      break;
  }

});

// Open the first available input port.
input.openPort(0);





