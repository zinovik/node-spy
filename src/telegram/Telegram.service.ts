import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';

import { ITelegramService } from './ITelegramService.interface';
import { IGetWebhookInfoResult } from './IGetWebhookInfoResult.interface';
import { IGetUpdatesResult } from './IGetUpdatesResult.interface';
import { IMessageBody } from '../common/model/IMessageBody.interface';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

export class TelegramService implements ITelegramService {
  private offset: number;

  constructor(private readonly token: string, private readonly timeout: number) {
    this.token = token;
    this.timeout = timeout;

    this.offset = 0;
  }

  async getUpdates(): Promise<IMessageBody[]> {
    const { data }: { data: IGetUpdatesResult } = await axios.post(
      `${TELEGRAM_API_URL}${this.token}/getUpdates`,
      { offset: this.offset, timeout: this.timeout },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const messagesBodies = data.result;

    messagesBodies.forEach(messageBody => console.log(`new message: ${messageBody.message.text}`));

    this.offset = messagesBodies.reduce((acc, messageBody) => Math.max(acc, messageBody.update_id), -1) + 1;

    return messagesBodies;
  }

  async sendPhoto(chatId: number | string, photoPath: string): Promise<void> {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', (fs as any).createReadStream(photoPath));

    await axios.post(`${TELEGRAM_API_URL}${this.token}/sendPhoto`, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${(formData as any)._boundary}`,
      },
    });
  }

  async getWebhookUrl(): Promise<string> {
    const { data }: { data: IGetWebhookInfoResult } = await axios.post(
      `${TELEGRAM_API_URL}${this.token}/getWebhookInfo`,
    );

    return data.result.url;
  }

  async setWebhook(url: string): Promise<void> {
    await axios.post(
      `${TELEGRAM_API_URL}${this.token}/setWebhook`,
      { url },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
