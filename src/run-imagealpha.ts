import { AppRunner } from '.';
import { IMAGEALPHA } from './constants';
import { isSupported } from './is-supported';
import { info, verbose } from './log';
import { pngquant } from './pngquant';

export const runImageAlpha: AppRunner = async (options) => {
  const pngFilePaths = options.files.supported
    .map((file) => file.tmp)
    .filter(isSupported(IMAGEALPHA.supports));
  info(`Running ${IMAGEALPHA.name}...`);
  await pngquant(options.tmpDir, pngFilePaths);
  verbose(`${IMAGEALPHA.name} has finished`);
};
