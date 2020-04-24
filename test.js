const readline = require('readline');

const rl = readline.createInterface({
  input: process.input,
  output: process.output,
});

rl.addListener('line', (input) => {
  console.log(parseInt(input, 16));
});
