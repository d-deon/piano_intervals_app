document.addEventListener('DOMContentLoaded', function () {
    
  document.querySelector('.backBtn').addEventListener('click', function() {
      
      playSound('backBtn-disco');

      
      setTimeout(function () {
          window.location.href = 'main_menu.html';
      }, 500); 
  });
});

let pianoKeys = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', ','];
let pressedSequence = [];
let i = 0;
let interval;
let result;

let keyTimestamps = [];
let lastKeyPressTime = null;
let currentTime;
let timeDifference;


function playSound(note) {
  const sound = document.getElementById(note);
  sound.currentTime = 0;
  sound.play();
}

const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

keys.forEach(key => {
  console.log("key added")
  key.addEventListener('click',() => playNote(key))
})
document.addEventListener('keydown', e => {
  if (e.repeat) return
  const key = e.key
  const whiteKeyIndex = WHITE_KEYS.indexOf(key)
  const blackKeyIndex = BLACK_KEYS.indexOf(key)

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})

document.addEventListener('keydown', (event) => handleNote (event.key));

function handleNote (key) {

  console.log("in func");
  if(pianoKeys.includes(key.toLowerCase())) {
    console.log("piano key: " + key.toLowerCase());
    
    pressedSequence[i] = pianoKeys.indexOf(key.toLowerCase());
    i++;

    console.log(i);
    
    if(i == 2) {
      
      result = parseInt(Math.abs(pressedSequence[0] - pressedSequence[1]));
      console.log("the result: " + result);
      
      pressedSequence = [];
      i = 0;

      var sound;
      
      switch(result) {
        case 1:  
          interval = 'minor-second';
          sound = new Audio('intervals/1minorSecond.mp3');
          sound.play();
          break;
        case 2: 
          interval = 'major-second';
          sound = new Audio('intervals/2majorSecond.mp3');
          sound.play();
          break;
        case 3:
          interval = 'minor-third';
          sound = new Audio('intervals/3minorThird.mp3');
          sound.play();
          break; 
        case 4:
          interval = 'major-third';
          sound = new Audio('intervals/4majorThird.mp3');
          sound.play();
          break;
        case 5: 
          interval = 'perfect-fourth';
          sound = new Audio('intervals/5perfectFourth.mp3');
          sound.play();
          break;
        case 6: 
          interval = 'tritone';
          sound = new Audio('intervals/6tritone.mp3');
          sound.play();
          break;
        case 7: 
          interval = 'perfect-fifth';
          sound = new Audio('intervals/7perfectFifth.mp3');
          sound.play();
          break;
        case 8: 
          interval = 'minor-sixth';
          sound = new Audio('intervals/8minorSixth.mp3');
          sound.play();
          break;
        case 9:
          interval = 'major-sixth';
          sound = new Audio('intervals/9majorSixth.mp3');
          sound.play();
          break;
        case 10:
          interval = 'minor-seventh';
          sound = new Audio('intervals/10minorSeventh.mp3');
          sound.play();
          break;
        case 11:
          interval = 'major-seventh';
          sound = new Audio('intervals/11majorSeventh.mp3');
          sound.play();
          break;
        case 12:
          interval = 'octave';
          sound = new Audio('intervals/12octave.mp3');
          sound.play();
          break;
      
        default:
          interval = 'Invalid interval';
          sound = new Audio('intervals/Usher - Yeah ft. Lil Jon, Ludacris.mp3');
          sound.play();
          break;
      
      }
      setTimeout(function() {
        sound.play();
        displayMessage('You played ' + interval + '!');
      }, 500);
    }
  } else {
    console.log("not a piano key");
  }

}

function playNote(key) {
  console.log("KEY PRESSED:", key.dataset.note);
  const noteAudio = document.getElementById(key.dataset.note)
  noteAudio.currentTime = 0
  noteAudio.play()
  key.classList.add ('active')
  noteAudio.addEventListener('ended' , () => {
     
      key.classList.remove('active')
  })

}

//KEY COMBOS

// Maintain a sequence of pressed keys

// 0    1     2     3   4    5    6    7    8    9    10   11  12
// 'z', 's', 'x', 'd', 'c', 'g', 'v', 'b', 'h', 'n', 'j', 'm', ','

// minor-second = 1
// z-s = 0-1 = -1
// s-x = 1-2 = -1
// in modul

const intervalCombinationMap = {
'minor-second': ['z-s', 's-x', 'x-d','d-c', 'c-v', 'v-g','g-b', 'b-h', 'h-n','n-j', 'j-m', 'm-,'],
'major-second': ['z-x', 's-d', 'x-c','d-v', 'c-g', 'v-b','g-h', 'b-n', 'h-j','n-m', 'j-,'],
'minor-third': ['z-d', 's-c', 'x-v','d-g', 'c-b', 'v-h','g-n', 'b-j', 'h-m','n-,'],
'major-third': ['z-c', 's-v', 'x-g','d-b', 'c-h', 'v-n','g-j', 'b-m', 'h-,'],
'perfect-fourth': ['z-v', 's-g', 'x-b','d-h', 'c-n', 'v-j','g-m', 'b-,'],
'tritone': ['z-g', 's-b', 'x-h','d-n', 'c-j', 'v-m','g-,'],
'perfect-fifth': ['z-b', 's-h', 'x-n','d-j', 'c-m', 'v-,'],
'minor-sixth': ['z-h', 's-n', 'x-j','d-m', 'c-,'],
'major-sixth': ['z-n', 's-j', 'x-m','d-,'],
'minor-seventh': ['z-j', 's-m', 'x-,'],
'major-seventh': ['z-m', 's-,'],
'octave': ['z-,']

};

function displayMessage(content) {
const messageContainer = document.getElementById('message-container');
let message = content;


if (!content.trim()) {
  const intervalName = extractIntervalNameFromMessage(messageContainer.textContent);
  if (intervalName) {
    message = `You played ${intervalName}!`;
  } else {
    message = '';
  }
}


messageContainer.textContent = message;


if (message.trim() !== '') {
  messageContainer.style.display = 'block';
  setTimeout(() => {
    messageContainer.style.display = 'none';
    messageContainer.textContent = '';
  }, 1500);
} else {
  messageContainer.style.display = 'none';
}
}

function extractIntervalNameFromMessage(message) {
const match = message.match(/You played (.+?)!/);
return match ? match[1] : null;
}

function calculateTimeDifference() {
if (lastKeyPressTime) {
  const currentTime = Date.now();
  const timeDifference = currentTime - lastKeyPressTime;

  lastKeyPressTime = currentTime;

  return timeDifference;
}
return 0;
}


function handleCombination(combination) {
 
  const timeDifference = calculateTimeDifference();
  

  if (timeDifference < 25000) {
      
      playCombinationSound(combination);
      
      resetPressedSequence();
  } else {
     
      resetPressedSequence();
  }
}
function resetPressedSequence() {
  pressedSequence = [];
}

function playCombinationSound(combination) {

const sound = document.getElementById(combination);

if (sound) {
  sound.currentTime = 0;
  sound.play();
  const intervalName = getIntervalName(combination);
  
}
}



function getIntervalName(combination) {

for (const [interval, combinations] of Object.entries(intervalCombinationMap)) {
  

  if (combinations.includes(combination)) {
    console.log('Match found! Interval:', interval);
    return interval;
  }
}}



function playSound(soundFilePath) {
const sound = new Audio(soundFilePath);
sound.play();
}


function getCombinationFromKeyPress(event) {
const key = event.key.toLowerCase();

pressedSequence.push(key);
if (pressedSequence.length > 2) {
  pressedSequence.shift();
}

const combinations = {

  'z-s': 'C-Db',
  's-z': 'C-Db',
  'z-x': 'C-D',
  'x-z': 'C-D',
  'z-d': 'C-Eb',
  'd-z': 'C-Eb',
  'z-c': 'C-E',
  'c-z': 'C-E',
  'z-v': 'C-F',
  'v-z': 'C-F',
  'z-g': 'C-Gb',
  'g-z': 'C-Gb',
  'z-b': 'C-G',
  'b-z': 'C-G',
  'z-h': 'C-Ab',
  'h-z': 'C-Ab',
  'z-n': 'C-A',
  'n-z': 'C-A',
  'z-j': 'C-Bb',
  'j-z': 'C-Bb',
  'z-m': 'C-B',
  'm-z': 'C-B',
  'z-,': 'C-C2',
  ',-z': 'C-C2',

  // Db
  's-x': 'Db-D',
  'x-s': 'Db-D',
  's-d': 'Db-Eb',
  'd-s': 'Db-Eb',
  's-c': 'Db-E',
  'c-s': 'Db-E',
  's-v': 'Db-F',
  'v-s': 'Db-F',
  's-g': 'Db-Gb',
  'g-s': 'Db-Gb',
  's-b': 'Db-G',
  'b-s': 'Db-G',
  's-h': 'Db-Ab',
  'h-s': 'Db-Ab',
  's-n': 'Db-A',
  'n-s': 'Db-A',
  's-j': 'Db-Bb',
  'j-s': 'Db-Bb',
  's-m': 'Db-B',
  'm-s': 'Db-B',
  's-,': 'Db-C2',
  ',-s': 'Db-C2',

  // D
  'x-d': 'D-Eb',
  'd-x': 'D-Eb',
  'x-c': 'D-E',
  'c-x': 'D-E',
  'x-v': 'D-F',
  'v-x': 'D-F',
  'x-g': 'D-Gb',
  'g-x': 'D-Gb',
  'x-b': 'D-G',
  'b-x': 'D-G',
  'x-h': 'D-Ab',
  'h-x': 'D-Ab',
  'x-n': 'D-A',
  'n-x': 'D-A',
  'x-j': 'D-Bb',
  'j-x': 'D-Bb',
  'x-m': 'D-B',
  'm-x': 'D-B',
  'x-,': 'D-C2',
  ',-x': 'D-C2',

  // Eb
  'd-c': 'Eb-E',
  'c-d': 'Eb-E',
  'd-v': 'Eb-F',
  'v-d': 'Eb-F',
  'd-g': 'Eb-Gb',
  'g-d': 'Eb-Gb',
  'd-b': 'Eb-G',
  'b-d': 'Eb-G',
  'd-h': 'Eb-Ab',
  'h-d': 'Eb-Ab',
  'd-n': 'Eb-A',
  'n-d': 'Eb-A',
  'd-j': 'Eb-Bb',
  'j-d': 'Eb-Bb',
  'd-m': 'Eb-B',
  'm-d': 'Eb-B',
  'd-,': 'Eb-C2',
  ',-d': 'Eb-C2',

  // E
  'c-v': 'E-F',
  'v-c': 'E-F',
  'c-g': 'E-Gb',
  'g-c': 'E-Gb',
  'c-b': 'E-G',
  'b-c': 'E-G',
  'c-h': 'E-Ab',
  'h-c': 'E-Ab',
  'c-n': 'E-A',
  'n-c': 'E-A',
  'c-j': 'E-Bb',
  'j-c': 'E-Bb',
  'c-m': 'E-B',
  'm-c': 'E-B',
  'c-,': 'E-C2',
  ',-c': 'E-C2',

  // F
  'v-g': 'F-Gb',
  'g-v': 'F-Gb',
  'v-b': 'F-G',
  'b-v': 'F-G',
  'v-h': 'F-Ab',
  'h-v': 'F-Ab',
  'v-n': 'F-A',
  'n-v': 'F-A',
  'v-j': 'F-Bb',
  'j-v': 'F-Bb',
  'v-m': 'F-B',
  'm-v': 'F-B',
  'v-,': 'F-C2',
  ',-v': 'F-C2',

  // Gb
  'g-b': 'Gb-G',
  'b-g': 'Gb-G',
  'g-h': 'Gb-Ab',
  'h-g': 'Gb-Ab',
  'g-n': 'Gb-A',
  'n-g': 'Gb-A',
  'g-j': 'Gb-Bb',
  'j-g': 'Gb-Bb',
  'g-m': 'Gb-B',
  'm-g': 'Gb-B',
  'g-,': 'Gb-C2',
  ',-g': 'Gb-C2',

  // G
  'b-h': 'G-Ab',
  'h-b': 'G-Ab',
  'b-n': 'G-A',
  'n-b': 'G-A',
  'b-j': 'G-Bb',
  'j-b': 'G-Bb',
  'b-m': 'G-B',
  'm-b': 'G-B',
  'b-,': 'G-C2',
  ',-b': 'G-C2',

  // Ab
  'h-n': 'Ab-A',
  'n-h': 'Ab-A',
  'h-j': 'Ab-Bb',
  'j-h': 'Ab-Bb',
  'h-m': 'Ab-B',
  'm-h': 'Ab-B',
  'h-,': 'Ab-C2',
 
  // A
  'n-j': 'A-Bb',
  'j-n': 'A-Bb',
  'n-m': 'A-B',
  'm-n': 'A-B',
  'n-,': 'A-C2',
  ',-n': 'A-C2',

  // Bb
  'j-m': 'Bb-B',
  'm-j': 'Bb-B',
  'j-,': 'Bb-C2',
  ',-j': 'Bb-C2',

  // B
  'm-,': 'B-C2',
  ',-m': 'B-C2',
};



for (const combo in combinations) {
  const comboKeys = combo.split('-');
  if (
    pressedSequence[0] === comboKeys[0] && pressedSequence[1] === comboKeys[1]||
    (pressedSequence[0] === comboKeys[1] && pressedSequence[1] === comboKeys[0])
  ) {
    return combinations[combo];
  }
}

return null;
}
