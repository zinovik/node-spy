const NodeWebcam = require('node-webcam');

import { IWebcamService } from './IWebcamService.interface';

const options = {
  width: 1280,
  height: 720,
  quality: 100,
  saveShots: true,
  output: 'jpeg',
  device: false,
  callbackReturn: 'location',
  verbose: false,
};

export class WebcamService implements IWebcamService {
  async makePhoto(photoPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      NodeWebcam.capture(photoPath, options, (error: any, data: any) => {
        if (error) {
          reject(error);
        }

        resolve(data);
      });
    });
  }
}
