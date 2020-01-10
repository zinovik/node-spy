import { ISpy } from './ISpy.interface';
import { IWebcamService } from '../webcam/IWebcamService.interface';
import { ITelegramService } from '../telegram/ITelegramService.interface';
import { IFileSystemService } from '../file-system/IFileSystemService.interface';
import { ISpyConfiguration } from '../common/model/ISpyConfiguration.interface';
import { IMessageBody } from '../common/model/IMessageBody.interface';

const FILE_NAME = 'photo';

export class Spy implements ISpy {
  private oldWebhook: string;
  private isRun: boolean;

  constructor(
    private configuration: ISpyConfiguration,
    private webcamService: IWebcamService,
    private telegramService: ITelegramService,
    private fileSystemService: IFileSystemService,
  ) {
    this.isRun = true;
  }

  async start(): Promise<void> {
    this.oldWebhook = await this.telegramService.getWebhookUrl();

    if (this.oldWebhook) {
      await this.telegramService.setWebhook('');
    }

    while (this.isRun) {
      let messagesBodies: IMessageBody[] = [];

      try {
        messagesBodies = await this.telegramService.getUpdates();
      } catch (error) {
        console.log(error.message);
      }

      if (messagesBodies.some(messageBody => messageBody.message.text === this.configuration.password)) {
        await this.webcamService.makePhoto(FILE_NAME);

        messagesBodies.forEach(async messageBody => {
          if (messageBody.message.text === this.configuration.password) {
            await this.telegramService.sendPhoto(
              messageBody.message.from.id,
              `${this.configuration.currentPath}/${FILE_NAME}.jpg`,
            );
          }
        });

        await this.fileSystemService.removeFile(`${this.configuration.currentPath}/${FILE_NAME}.jpg`);
      }
    }
  }

  async stop(): Promise<void> {
    this.isRun = false;

    if (this.oldWebhook) {
      await this.telegramService.setWebhook(this.oldWebhook);
    }
  }
}
