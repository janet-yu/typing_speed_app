var keys = document.querySelectorAll('.keyboard-key rect');
var textContainer = document.querySelector('.text');
var WPM = document.querySelector('#wpm');
var errorsText = document.querySelector('#errors');

var ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
var VOWELS = 'aeiou';
var CONSONANTS = 'bcdfghjklmnpqrstvwxyz';


appendText();
var words = 0;
var index = 0;
var text = document.querySelector('#text');
var lettersList = document.querySelectorAll('#text span'); // node list of all letters
lettersList[index].classList.add('currentChar');

function main() {
  var errors = 0;
  var keyboardKey;
  var keyboardBG;
  var start;

  // Handles the keydown color changes
  window.addEventListener('keydown', function(e) {
    let charPressed = e.key;
    if (ALPHABET.indexOf(charPressed) != -1) {
      keyboardKey = document.querySelector(`#${charPressed}`);
      keyboardBG = keyboardKey.previousElementSibling;
      keyboardBG.classList.add('pressedBG');
      keyboardKey.classList.add('pressedKey');
    }
  })

  //Handles matching letters logic
  window.addEventListener('keydown', function(e) {
    if (index == 0) {
      start = Date.now();
    }
    if (index === lettersList.length - 1) {
      var end = Date.now() - start;
      var seconds = Math.floor(end/1000);
      removeText();
      appendText();
      redefineLetters();
      index = 0;
      lettersList[index].classList.add('currentChar');
      words += 1;
      WPM.innerText = Math.floor(words/(seconds/60)) + ' WPM';
      errorsText.innerText = errors + ' Errors';
      words = 0;
      errors = 0;
    } else {
        if (e.key === lettersList[index].innerHTML ||
        (e.key === ' ' && lettersList[index].innerHTML === '_')) {
        lettersList[index].classList.add('charRight');
        index++;
        lettersList[index - 1].classList.remove('currentChar');
        lettersList[index].classList.add('currentChar');

        if (lettersList[index].innerHTML === '_') {
          words += 1
        }
      } else {
        lettersList[index].classList.add('charWrong');
        errors++;
      }
   }
  })

  window.addEventListener('keyup', function(e) {
    for (let i = 0; i < keys.length; i++) {
      keys[i].classList.remove('pressedBG')
    }
    for (let i = 0; i < keys.length; i++) {
      keys[i].nextElementSibling.classList.remove('pressedKey');
    }
  })

}

// HELPER FUNCTIONS //

function generateRandomIndex(type) {
  var randomIndex;
  if (type === 'VOWELS') {
    randomIndex = Math.floor(Math.random() * VOWELS.length);
  } else {
    randomIndex = Math.floor(Math.random() * CONSONANTS.length);
  }
  return randomIndex;
}
function grabRandomLetter(type) {
  if (type === 'VOWELS') {
    let index = generateRandomIndex(type);
    return VOWELS[index];
  } else {
    let index = generateRandomIndex(type);
    return CONSONANTS[index];
  }
}
function generateRandomWord() {
  let wordLength = generateWordLength(6);
  var word = '';
  for (let i = 0; i < wordLength; i++) {
    let type = generateRandomType()
    word += '<span>' + grabRandomLetter(type) + '</span>';
  }
  return word;
}

function generateRandomType() {
  let types = ['VOWELS', 'CONSONANTS'];
  return types[Math.floor(Math.random() * types.length)];
}

function generateWordLength(maxLength) {
  return Math.floor(Math.random() * (maxLength - 3)) + 3;
}

function generateText() {
  let textGenerated = '';
  for (let i = 0; i < 12; i++) {
    let randomWord = generateRandomWord();
    if (i === 11) {
      textGenerated+= randomWord;
    } else {
      textGenerated += randomWord + '<span>' + '_' + '</span>';
    }
  }
  return textGenerated;
}

function appendText() {
  let textGenerated = generateText();
  let letters = document.createElement('P');
  letters.setAttribute('id', 'text');
  letters.innerHTML = textGenerated;
  textContainer.appendChild(letters);
}

function removeText() {
  textContainer.innerHTML = '';
}

function redefineLetters () {
  lettersList = document.querySelectorAll('#text span');
}
main();
