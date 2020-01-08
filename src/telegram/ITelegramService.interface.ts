export interface ITelegramService {
  getUpdates(offset?: number): Promise<void>;
  sendPhoto(chatId: number | string, photoPath: string): Promise<void>;
  setWebhook(url: string): Promise<void>;
}
