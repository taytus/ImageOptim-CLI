import * as execa from 'execa';
import {
  PNGQUANT_BIN_PATH,
  PNGQUANT_NUMBER_OF_COLOURS,
  PNGQUANT_QUALITY,
  PNGQUANT_SPEED
} from './constants';

export const pngquant = async (tmpDir: string, files: string[]): Promise<void> => {
  try {
    await execa(PNGQUANT_BIN_PATH, [
      '--ext=.png',
      '--force',
      '--skip-if-larger',
      `--speed=${PNGQUANT_SPEED}`,
      `--quality=${PNGQUANT_QUALITY}`,
      PNGQUANT_NUMBER_OF_COLOURS,
      '--',
      ...files
    ]);
  } catch (err) {
    if (err.code !== 99 && err.code !== 98) {
      throw new Error(err.message);
    }
  }
};
