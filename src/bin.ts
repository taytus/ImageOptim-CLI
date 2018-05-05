#!/usr/bin/env node

import * as program from 'commander';
import { sync } from 'globby';
import { join } from 'path';
import { cli } from './';
import {
  PNGQUANT_NUMBER_OF_COLOURS,
  PNGQUANT_QUALITY,
  PNGQUANT_SPEED,
  SUPPORTED_FILE_TYPES,
  TMPDIR,
  VERSION
} from './constants';
import { isSupported } from './is-supported';

const patterns: string[] = [];

program
  .version(VERSION)
  .arguments('[patterns...]')
  .action((args: string[]) => {
    patterns.push(...args.filter((arg) => arg && typeof arg === 'string'));
  })
  .option('-a, --imagealpha', 'enable ImageAlpha')
  .option('-j, --jpegmini', 'enable JPEGmini')
  .option('-C, --no-color', 'output to the terminal without colors')
  .option('-I, --no-imageoptim', 'disable ImageOptim')
  .option('-Q, --no-quit', 'do not quit apps once finished')
  .option('-S, --no-stats', 'do not display file size savings and quality loss information')
  .option(
    '--number-of-colors <n>',
    `ImageAlpha palette size, defaults to ${PNGQUANT_NUMBER_OF_COLOURS}`
  )
  .option(
    '--quality <min>-<max>',
    `ImageAlpha quality range from 0-100, defaults to ${PNGQUANT_QUALITY}`
  )
  .option(
    '--speed <n>',
    `ImageAlpha speed from 1 (brute-force) to 10 (fastest), defaults to ${PNGQUANT_SPEED}`
  );

program.on('--help', () => {
  console.log('');
  console.log('  ImageOptim: https://imageoptim.com');
  console.log('  JPEGmini:   https://itunes.apple.com/us/app/jpegmini/id498944723');
  console.log('  ImageAlpha: https://pngmini.com');
});

program.parse(process.argv);

if (process.platform !== 'darwin') {
  console.log('imageoptim-cli is macOS only');
}

const filePaths = sync(patterns);
const supportedFilePaths = filePaths.filter(isSupported(SUPPORTED_FILE_TYPES)).map((filePath) => ({
  source: filePath,
  tmp: join(TMPDIR, filePath)
}));

cli({
  enabled: {
    color: program.color === true,
    imageAlpha: program.imagealpha === true,
    imageOptim: program.imageoptim === true,
    jpegMini: program.jpegmini === true,
    numberOfColors: program.numberOfColors || PNGQUANT_NUMBER_OF_COLOURS,
    quality: program.quality || PNGQUANT_QUALITY,
    quit: program.quit === true,
    speed: program.speed || PNGQUANT_SPEED,
    stats: program.stats === true
  },
  files: {
    all: filePaths,
    supported: supportedFilePaths
  },
  tmpDir: TMPDIR
});
