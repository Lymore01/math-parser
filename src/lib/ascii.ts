import figlet from 'figlet';
import chalk from 'chalk';

export const ascii = chalk.cyan(
  figlet.textSync('MathParser', {
    font: 'Standard', // Try others like "Slant", "Ghost", "Banner"
    horizontalLayout: 'default',
    verticalLayout: 'default',
  }),
);
