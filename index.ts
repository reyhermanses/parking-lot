// index.ts

import CommandProcessor from './src/CommandProcessor';

const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Usage: ts-node index.ts <input_file>');
  process.exit(1);
}

const filename:string = args[0];
const commandProcessor = new CommandProcessor(filename);
commandProcessor.processCommands();
