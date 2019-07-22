export interface IWebcamService {
  makePhoto(photoPath: string): Promise<void>;
}
