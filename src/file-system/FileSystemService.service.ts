import * as fs from 'fs';
import { promisify } from 'util';

import { IFileSystemService } from './IFileSystemService.interface';

export class FileSystemService implements IFileSystemService {
  async removeFile(path: string): Promise<void> {
    await promisify(fs.unlink)(path);
  }
}
