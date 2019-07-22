import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';

import { ITelegramService } from './ITelegramService.interface';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

export class TelegramService implements ITelegramService {
  constructor(private readonly token: string) {
    this.token = token;
  }

  async sendPhoto(chatId: number | string, photoPath: string) {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', (fs as any).createReadStream(photoPath));

    await axios.post(`${TELEGRAM_API_URL}${this.token}/sendPhoto`, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${(formData as any)._boundary}`,
      },
    });
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
