export interface ITelegramService {
  getUpdates(offset?: number): Promise<void>;
  sendPhoto(chatId: number | string, photoPath: string): Promise<void>;
  getWebhookUrl(): Promise<string>;
  setWebhook(url: string): Promise<void>;
}
