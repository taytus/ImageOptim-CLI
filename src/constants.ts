import { uniq } from 'lodash';
import { tmpdir } from 'os';
import { join } from 'path';

export interface IApp {
  readonly bundleId: string;
  readonly name: string;
  readonly supports: string[];
}

const manifest = require('../package.json');
const supports = {
  imageAlpha: ['.png'],
  imageOptim: ['.bmp', '.gif', '.jpeg', '.jpg', '.pcx', '.png', '.pnm', '.tga', '.tiff'],
  jpegmini: ['.jpg', '.jpeg']
};

export const SUPPORTED_FILE_TYPES = uniq([
  ...supports.imageAlpha,
  ...supports.imageOptim,
  ...supports.jpegmini
]).sort();

export const TMPDIR = join(tmpdir(), 'imageoptim-cli');
export const VERSION = manifest.version;
export const PNGQUANT_NUMBER_OF_COLOURS = '256';
export const PNGQUANT_QUALITY = '65-80';
export const PNGQUANT_SPEED = '1';
export const PNGQUANT_BIN_PATH = '/Applications/ImageAlpha.app/Contents/MacOS/pngquant';
export const IMAGEOPTIM_BIN_PATH = '/Applications/ImageOptim.app/Contents/MacOS/ImageOptim';

export const IMAGEALPHA: IApp = {
  bundleId: 'net.pornel.ImageAlpha',
  name: 'ImageAlpha',
  supports: supports.imageAlpha
};

export const IMAGEOPTIM: IApp = {
  bundleId: 'net.pornel.ImageOptim',
  name: 'ImageOptim',
  supports: supports.imageOptim
};

export const JPEGMINI: IApp = {
  bundleId: 'com.icvt.JPEGmini',
  name: 'JPEGmini',
  supports: supports.jpegmini
};

export const JPEGMINI_RETAIL: IApp = {
  bundleId: 'com.icvt.JPEGmini-retail',
  name: 'JPEGmini',
  supports: supports.jpegmini
};

export const JPEGMINI_LITE: IApp = {
  bundleId: 'com.icvt.JPEGminiLite',
  name: 'JPEGmini Lite',
  supports: supports.jpegmini
};

export const JPEGMINI_LITE_RETAIL: IApp = {
  bundleId: 'com.icvt.JPEGminiLite-retail',
  name: 'JPEGmini Lite',
  supports: supports.jpegmini
};

export const JPEGMINI_PRO: IApp = {
  bundleId: 'com.icvt.JPEGmini-Pro',
  name: 'JPEGmini Pro',
  supports: supports.jpegmini
};

export const JPEGMINI_PRO_RETAIL: IApp = {
  bundleId: 'com.icvt.JPEGmini-Pro-retail',
  name: 'JPEGmini Pro',
  supports: supports.jpegmini
};

export const ERROR_JPEGMINI_NOT_INSTALLED = 'ERROR_JPEGMINI_NOT_INSTALLED';
export const ERROR_CANNOT_AUTOMATE_OSX = 'ERROR_CANNOT_AUTOMATE_OSX';
