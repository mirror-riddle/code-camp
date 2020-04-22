const readline = require('readline');

// This is automatically called by any readline instance on its input if the input is a terminal.
readline.emitKeypressEvents(process.stdin);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// get last word length by listening line event on readline instance
const listenLine = () => {
  rl.addListener('line', (input) => {
    const trimedInput = input.trim();
    const lastSpaceIndex = trimedInput.lastIndexOf(' ');
    const lastWordLength =
      lastSpaceIndex === -1
        ? trimedInput.length
        : trimedInput.length - lastSpaceIndex - 1;
    console.log(lastWordLength);
    rl.close();
  });
};

const isSpace = (character) => {
  return character === ' ';
};

const isEndOfLine = (character) => {
  return ['\n', '\r', '\r\n'].includes(character);
};

// get last word length by listening keypress event on stdin
const listenKerpress = () => {
  let lastWordLenth = 0;
  let previousCharacter = '';
  let currentCharacter = '';

  process.stdin.on('keypress', (character) => {
    previousCharacter = currentCharacter;
    currentCharacter = character;

    if (isEndOfLine(currentCharacter)) {
      console.log(lastWordLenth);
      rl.close();
      return;
    }

    if (!isSpace(currentCharacter)) {
      if (isSpace(previousCharacter)) {
        lastWordLenth = 1;
      } else {
        lastWordLenth += 1;
      }
    }
  });
};

// listenLine();
listenKerpress();
