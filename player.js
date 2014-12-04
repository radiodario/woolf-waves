var midi = require('midi'),
  midiOut = new midi.output();

try {
  midiOut.openPort(0);
} catch(error) {
  midiOut.openVirtualPort('');
}

var start = 1;

var lines = require('./processed').data;
var i = start,
    interval, line;
var BPM = 40;
var noteDuration = 1000;

var notes = {
    // C:  60,
    // Cs: 61,
    // D:  62,
    // Ds: 63,
    // E:  64,
    // F:  65,
    // Fs: 66,
    // G:  67,
    // Gs: 68,
    // A:  69,
    // As: 70,
    // B:  71
    C:  24,
    Cs: 25,
    D:  26,
    Ds: 27,
    E:  28,
    F:  29,
    Fs: 30,
    G:  31,
    Gs: 32,
    A:  33,
    As: 34,
    B:  35
};


var scale = [
"C",
// "Cs", //
"D",
// "Ds", //
"E",
"F",
// "Fs", //
"G",
// "Gs", //
"A",
"As",
// "B" //
];


function playNote() {
  line = lines[i % lines.length]; // loop forever

  var octave = ((line.numberOfWords / scale.length | 0) % 10) - 2;

  var noteName = scale[line.numberOfWords % scale.length];

  var note = (notes[noteName] + (octave * 12));


  var semi = lines[i-1].lastWord + "; " + line.firstWord;


  console.log(i, semi, noteName, octave, "midi code:", note);

  midiOut.sendMessage([144, note, 100]);
  setTimeout(function() {
    midiOut.sendMessage([128, note, 100]);
  }, noteDuration + Math.random() * 1000 | 0);

  i++;

}




function play() {
  console.log("Play!");
  playNote();
  interval = setInterval(playNote, 1000/(BPM/60));
}

function stop() {
  console.log("Stop!");
  i = start;
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





