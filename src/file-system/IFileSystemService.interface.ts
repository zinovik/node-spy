export interface IFileSystemService {
  removeFile(path: string): Promise<void>;
}
