import { stat } from 'fs-extra';
import { IFileStats, IOptions, IStats } from '.';
import { formatFilesize } from './filesize';

const getFileSize = async (filePath: string) => {
  const { size } = await stat(filePath);
  return size;
};

export const getStats = async (options: IOptions): Promise<IStats> => {
  const fileStats: IFileStats[] = await Promise.all(
    options.files.supported.map(async ({ source, tmp }) => {
      const sizeAfter = await getFileSize(source);
      const sizeBefore = await getFileSize(tmp);
      const sizeSaving = sizeBefore - sizeAfter;
      return {
        path: source,
        pretty: {
          after: formatFilesize(sizeAfter),
          before: formatFilesize(sizeBefore),
          saving: formatFilesize(sizeSaving)
        },
        raw: {
          after: sizeAfter,
          before: sizeBefore,
          saving: sizeSaving
        }
      };
    })
  );
  const totalStats = fileStats.reduce(
    (total, file) => {
      const after = total.raw.after + file.raw.after;
      const before = total.raw.before + file.raw.before;
      const saving = total.raw.saving + file.raw.saving;
      return {
        path: 'TOTAL',
        pretty: {
          after: formatFilesize(after),
          before: formatFilesize(before),
          saving: formatFilesize(saving)
        },
        raw: {
          after,
          before,
          saving
        }
      };
    },
    {
      path: 'TOTAL',
      pretty: {
        after: formatFilesize(0),
        before: formatFilesize(0),
        saving: formatFilesize(0)
      },
      raw: {
        after: 0,
        before: 0,
        saving: 0
      }
    }
  );

  return {
    files: fileStats,
    total: totalStats
  };
};
