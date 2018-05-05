import chalk from 'chalk';

let colour = new chalk.constructor({ enabled: true });

export const complete = (value: string): void => console.log(colour.green('✓ %s'), value);
export const info = (value: string): void => console.log(colour.blue('i %s'), value);
export const warning = (value: string): void => console.log(colour.yellow('! %s'), value);

export const bug = (err: Error): void => {
  console.log(
    colour.red('! %s\n\n! Please raise an issue at %s\n\n%s'),
    err.message,
    colour.underline('https://github.com/JamieMason/ImageOptim-CLI/issues'),
    String(err.stack).replace(/^/gm, '    ')
  );
  process.exit(1);
};

export const result = (
  label: string = 'TOTAL',
  prettySizeBefore: string,
  prettySizeAfter: string,
  prettySizeSaving: string,
  sizeSavingPercent: number,
  qualityPercent: number
) => {
  console.log(
    '%s %s was: %s now: %s saving: %s (%s) quality: %s',
    colour.green('✓'),
    chalk.underline(label),
    colour.red(prettySizeBefore),
    colour.green(prettySizeAfter),
    colour.green(prettySizeSaving),
    colour.green(`${sizeSavingPercent}%`),
    colour.green(`${qualityPercent}%`)
  );
};

export const verbose =
  process.env.NODE_ENV === 'development'
    ? (value: string): void => console.info(colour.grey('? %s'), value)
    : (): void => undefined;

export const enableColour = (enabled: boolean) => {
  colour = new chalk.constructor({ enabled });
};
