import { getStats } from './get-stats';
import { bug, complete, enableColour, result } from './log';
import { runImageAlpha } from './run-imagealpha';
import { runImageOptim } from './run-imageoptim';
import { runJpegMini } from './run-jpegmini';
import { clean, setup, tearDown } from './tmpdir';

export type AppRunner = (options: IOptions) => Promise<void>;

export interface IFile {
  source: string;
  tmp: string;
}

export interface IFileStats {
  path: string;
  pretty: {
    after: string;
    before: string;
    saving: string;
  };
  raw: {
    after: number;
    before: number;
    saving: number;
  };
}

export interface IStats {
  files: IFileStats[];
  total: IFileStats;
}

export interface IOptions {
  enabled: {
    color: boolean;
    imageAlpha: boolean;
    imageOptim: boolean;
    jpegMini: boolean;
    numberOfColors: string;
    quality: string;
    quit: boolean;
    speed: string;
    stats: boolean;
  };
  files: {
    all: string[];
    supported: IFile[];
  };
  tmpDir: string;
}

const runnersByName = {
  imageAlpha: runImageAlpha,
  imageOptim: runImageOptim,
  jpegMini: runJpegMini
};

export const cli = async (options: IOptions) => {
  try {
    const runIfEnabled = (key: keyof typeof runnersByName) =>
      options.enabled[key] ? runnersByName[key](options) : Promise.resolve();

    enableColour(options.enabled.color);
    await setup(options);
    await Promise.all([runIfEnabled('imageAlpha'), runIfEnabled('jpegMini')]);
    await runIfEnabled('imageOptim');
    const stats = await getStats(options);
    await tearDown(options);
    stats.files.forEach(({ path, pretty, raw }) => {
      const savingPercent = raw.saving ? raw.saving / raw.before * 100 : 0;
      result(path, pretty.before, pretty.after, pretty.saving, savingPercent, 100);
    });
    const totalSavingPercent = stats.total.raw.saving
      ? stats.total.raw.saving / stats.total.raw.before * 100
      : 0;
    result(
      stats.total.path,
      stats.total.pretty.before,
      stats.total.pretty.after,
      stats.total.pretty.saving,
      totalSavingPercent,
      100
    );
    complete('Finished');
  } catch (err) {
    bug(err);
    await clean(options);
  }
};
