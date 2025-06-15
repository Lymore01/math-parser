import chalk from 'chalk';
import boxen from 'boxen';
import prompts from 'prompts';
import ora from 'ora';
import { MyParser } from './parser/index';
import { ascii } from './lib/ascii';
import { showNotes } from './lib/notes';

console.log(
  boxen(ascii, { padding: 1, borderColor: 'green', borderStyle: 'double' }),
);

export async function cli() {
  const { mode } = await prompts({
    type: 'select',
    name: 'mode',
    message: chalk.green('Choose mode'),
    choices: [
      { title: 'Evaluate expression', value: 'eval' },
      { title: 'Print AST', value: 'ast' },
      { title: 'Read Notes', value: 'notes' },
    ],
  });

  if (mode === 'notes') {
    showNotes();
    return;
  }

  while (true) {
    const { expression } = await prompts({
      type: 'text',
      name: 'expression',
      message: chalk.green("Enter a math expression (or 'exit' to quit)"),
      validate: (val) => (val.trim() ? true : 'Expression cannot be empty'),
    });

    if (expression.trim().toLowerCase() === 'exit') {
      console.log(chalk.yellow('👋 Exiting. Have a nice day!'));
      process.exit(0);
    }

    const spinner = ora('Processing...').start();

    try {
      const parser = new MyParser(expression);
      if (mode === 'eval') {
        const result = parser.evaluateExpression();
        spinner.succeed(chalk.blueBright(`🧮 Result: ${result}`));
      } else {
        const ast = parser.generateAST();
        spinner.stop();
        console.log(chalk.magentaBright('🌲 AST Output:'));
        console.dir(ast, { depth: null, colors: true });
      }
    } catch (err: any) {
      spinner.fail(chalk.redBright('❌ ' + err.message));
    }
  }
}

cli();
