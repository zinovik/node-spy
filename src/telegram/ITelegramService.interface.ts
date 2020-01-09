import { IMessageBody } from '../common/model/IMessageBody.interface';

export interface ITelegramService {
  getUpdates(offset?: number): Promise<IMessageBody[]>;
  sendPhoto(chatId: number | string, photoPath: string): Promise<void>;
  getWebhookUrl(): Promise<string>;
  setWebhook(url: string): Promise<void>;
}
